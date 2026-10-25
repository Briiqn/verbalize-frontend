import { TICK_DT, InputSample, RenderableEntity, Vec3 } from '../core/types';
import { clientState, worldDeltaKey } from '../core/store';
import { eventBus } from '../core/events';
import { stepSharedKinematics, ENTITY_BODY_RADIUS } from '../core/kinematics';
import { generateWorldFeatures } from '../core/worldgen.js';
import {
  WS_PATH,
  PENDING_INPUT_CAP,
  RECONCILE_SNAP_THRESHOLD_M,
  SNAPSHOT_INTERVAL_MS,
  SNAPSHOT_BUFFER_CAP,
  CLOCK_OFFSET_SMOOTHING
} from '../core/constants';
import { dev } from '../proto/protocol';
import { FrameCodec } from './FrameCodec';

const proto = dev.briiqn.verbalize.proto;

type IClientEnvelope = dev.briiqn.verbalize.proto.IClientEnvelope;
type IEntitySpawnInfo = dev.briiqn.verbalize.proto.IEntitySpawnInfo;
type IWorldDeltaRecord = dev.briiqn.verbalize.proto.IWorldDeltaRecord;
type IQuantizedEntityTransform = dev.briiqn.verbalize.proto.IQuantizedEntityTransform;
type IWelcomeEvent = dev.briiqn.verbalize.proto.IWelcomeEvent;
type IEntityLifecycleEvent = dev.briiqn.verbalize.proto.IEntityLifecycleEvent;
type IEntityDeltaTickEvent = dev.briiqn.verbalize.proto.IEntityDeltaTickEvent;
type IWorldDeltaEvent = dev.briiqn.verbalize.proto.IWorldDeltaEvent;
type IVoiceRelayEvent = dev.briiqn.verbalize.proto.IVoiceRelayEvent;
type INpcStreamChunkEvent = dev.briiqn.verbalize.proto.INpcStreamChunkEvent;

const HEARTBEAT_TICK_INTERVAL = 5;
const MAX_CATCHUP_TICKS = 5;

interface EntityObstacle {
  x: number;
  y: number;
  z: number;
  r: number;
}

let staticObstacles: EntityObstacle[] = [];
let staticCells: Map<string, number> = new Map();

const structureTypeAt = (gx: number, gy: number, gz: number): number =>
  clientState.worldDeltas.get(worldDeltaKey(gx, gy, gz))?.structureType ??
  staticCells.get(`${gx},${gy},${gz}`) ?? 0;

export function rebuildStaticObstacles(): void {
  const features = generateWorldFeatures(Number(clientState.worldSeed & 0xffffffffn));
  staticObstacles = features.obstacles;
  staticCells = features.staticCells;
}

// Server-acked positions (targetPos), not interpolated renderPos, to stay close to the server's sim
function gatherEntityObstacles(): EntityObstacle[] {
  const out: EntityObstacle[] = [...staticObstacles];
  for (const entity of clientState.entities.values()) {
    if (entity.netId === clientState.myNetId) continue;
    out.push({ x: entity.targetPos.x, y: entity.targetPos.y, z: entity.targetPos.z, r: ENTITY_BODY_RADIUS });
  }
  return out;
}

interface SampledInput {
  keyBitmask: number;
  yawMrad: number;
  pitchMrad: number;
  micEnergyByte: number;
  faceState: number;
  headRollMrad: number;
}

export class NetworkClient {
  private socket: WebSocket | null = null;
  private tickTimer: number | null = null;
  private lastTickTime = 0;
  private accumulator = 0;
  private tickCount = 0;
  private lastSampled: SampledInput | null = null;
  private inboundChain: Promise<void> = Promise.resolve();
  private readonly unsubscribers: Array<() => void> = [];

  constructor() {
    this.unsubscribers.push(
      eventBus.on('SEND_VOICE_CHUNK', ({ chunk, seq }) => {
        void this.send(
          {
            sequenceNumber: ++clientState.nextInputSeq,
            voiceStream: { opusChunk: chunk, chunkSeq: seq }
          },
          true
        );
      }),
      eventBus.on('SEND_NPC_AUDIO_INTERACT', ({ targetNetId, chunk, transcriptHint, isFinal }) => {
        void this.send(
          {
            sequenceNumber: ++clientState.nextInputSeq,
            npcAudioInteract: {
              targetNetId,
              audioChunk: chunk,
              transcriptHint,
              isFinalChunk: isFinal
            }
          },
          true
        );
      }),
      eventBus.on('SEND_WORLD_INTERACT', ({ gridX, gridY, gridZ, structureType }) => {
        void this.send({
          sequenceNumber: ++clientState.nextInputSeq,
          worldInteract: { gridX, gridY, gridZ, structureType }
        });
      }),
      eventBus.on('SEND_AVATAR_UPDATE', ({ hat, bodyColorHex, eyes, mouth, hair }) => {
        void this.send({
          sequenceNumber: ++clientState.nextInputSeq,
          avatarUpdate: { hat, bodyColorHex, eyes, mouth, hair }
        });
      })
    );
  }

  connect(username: string, password: string, roomCode = ''): void {
    const scheme = location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${scheme}://${location.host}${WS_PATH}`);
    socket.binaryType = 'arraybuffer';
    this.socket = socket;

    socket.onopen = () => {
      void this.send({
        sequenceNumber: ++clientState.nextInputSeq,
        join: { username, password, roomCode }
      });
    };

    socket.onmessage = (ev: MessageEvent<ArrayBuffer>) => {
      const raw = new Uint8Array(ev.data);
      this.inboundChain = this.inboundChain
        .then(() => this.handleFrame(raw))
        .catch((err) => {
          console.error('NetworkClient: inbound frame failed', err);
        });
    };

    socket.onclose = () => this.handleClose();
  }

  disconnect(): void {
    this.socket?.close();
  }

  dispose(): void {
    this.disconnect();
    for (const unsubscribe of this.unsubscribers) unsubscribe();
    this.unsubscribers.length = 0;
  }

  private async send(envelope: IClientEnvelope, isAudioFrame = false): Promise<void> {
    const socket = this.socket;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const payload = proto.ClientEnvelope.encode(envelope).finish();
    const frame = await FrameCodec.encode(payload, isAudioFrame);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(frame);
    }
  }

  private startTickLoop(): void {
    if (this.tickTimer !== null) return;
    this.lastTickTime = performance.now();
    this.accumulator = 0;
    this.tickCount = 0;
    this.lastSampled = null;
    this.tickTimer = window.setInterval(() => {
      const now = performance.now();
      this.accumulator += now - this.lastTickTime;
      this.lastTickTime = now;
      const maxBacklog = SNAPSHOT_INTERVAL_MS * MAX_CATCHUP_TICKS;
      if (this.accumulator > maxBacklog) this.accumulator = maxBacklog;
      while (this.accumulator >= SNAPSHOT_INTERVAL_MS) {
        this.accumulator -= SNAPSHOT_INTERVAL_MS;
        this.tick();
      }
    }, SNAPSHOT_INTERVAL_MS / 4);
  }

  private stopTickLoop(): void {
    if (this.tickTimer !== null) {
      window.clearInterval(this.tickTimer);
      this.tickTimer = null;
    }
  }

  private tick(): void {
    const keyBitmask = clientState.keyBitmask;
    const yawMrad = Math.round(clientState.cameraYawRad * 1000);
    const pitchMrad = Math.round(clientState.cameraPitchRad * 1000);
    const micEnergyByte = clientState.micEnergyByte;
    const faceState = clientState.faceState;
    const headRollMrad = clientState.headRollMrad;
    const seq = ++clientState.nextInputSeq;

    const sample: InputSample = { seq, keyBitmask, yawMrad, pitchMrad, micEnergyByte };
    const pending = clientState.localPrediction.pendingInputs;
    pending.push(sample);
    if (pending.length > PENDING_INPUT_CAP) {
      pending.splice(0, pending.length - PENDING_INPUT_CAP);
    }

    const lp = clientState.localPrediction;
    lp.prevPredictedPos = { ...lp.predictedPos };
    const wasAirborne = lp.predictedPos.y > 0;
    const step = stepSharedKinematics(
      lp.predictedPos,
      lp.predictedVel,
      keyBitmask,
      yawMrad,
      structureTypeAt,
      gatherEntityObstacles(),
      TICK_DT
    );
    lp.predictedPos = step.nextPos;
    lp.predictedVel = step.velocity;
    lp.lastPredictStepTime = performance.now();

    this.tickCount++;
    const prev = this.lastSampled;
    const changed =
      prev === null ||
      prev.keyBitmask !== keyBitmask ||
      prev.yawMrad !== yawMrad ||
      prev.pitchMrad !== pitchMrad ||
      prev.micEnergyByte !== micEnergyByte ||
      prev.faceState !== faceState ||
      prev.headRollMrad !== headRollMrad;
    this.lastSampled = { keyBitmask, yawMrad, pitchMrad, micEnergyByte, faceState, headRollMrad };

    const airborne = wasAirborne || step.nextPos.y > 0;
    if (keyBitmask !== 0 || changed || airborne || this.tickCount % HEARTBEAT_TICK_INTERVAL === 0) {
      void this.send({
        sequenceNumber: seq,
        movementInput: { keyBitmask, yawMrad, pitchMrad, micEnergyByte, faceState, headRollMrad }
      });
    }
  }

  private async handleFrame(raw: Uint8Array): Promise<void> {
    const payload = await FrameCodec.decode(raw);
    const envelope = proto.ServerEnvelope.decode(payload);
    clientState.serverTick = envelope.serverTick;

    if (envelope.welcome) this.onWelcome(envelope.welcome);
    else if (envelope.entityLifecycle) this.onEntityLifecycle(envelope.entityLifecycle);
    else if (envelope.entityDeltaTick) this.onEntityDeltaTick(envelope.entityDeltaTick);
    else if (envelope.worldDelta) this.onWorldDelta(envelope.worldDelta);
    else if (envelope.voiceRelay) this.onVoiceRelay(envelope.voiceRelay);
    else if (envelope.npcStreamChunk) this.onNpcStreamChunk(envelope.npcStreamChunk);
    else if (envelope.reputation) {
      const rep = envelope.reputation;
      clientState.reputation = rep.reputation ?? clientState.reputation;
      eventBus.emit('REPUTATION', {
        reputation: clientState.reputation,
        delta: rep.delta ?? 0,
        reason: rep.reason ?? ''
      });
    }
    else if (envelope.joinRejected) {
      eventBus.emit('SOCKET_REJECTED', { reason: envelope.joinRejected.reason ?? 'rejected' });
      this.disconnect();
    }
  }

  private onWelcome(welcome: IWelcomeEvent): void {
    const myNetId = welcome.assignedNetId ?? 0;
    clientState.myNetId = myNetId;
    clientState.worldSeed = BigInt(String(welcome.worldSeed ?? 0));
    clientState.connected = true;
    clientState.reputation = welcome.reputation ?? 100;
    eventBus.emit('REPUTATION', { reputation: clientState.reputation, delta: 0, reason: '' });
    rebuildStaticObstacles();

    clientState.entities.clear();
    for (const spawn of welcome.initialEntities ?? []) {
      this.addEntity(spawn);
    }

    clientState.worldDeltas.clear();
    for (const record of welcome.activeDeltas ?? []) {
      this.applyWorldDeltaRecord(record);
    }

    const own = clientState.entities.get(myNetId);
    if (own) {
      clientState.localPrediction.predictedPos = { ...own.targetPos };
      clientState.localPrediction.prevPredictedPos = { ...own.targetPos };
      clientState.localPrediction.lastPredictStepTime = performance.now();
      clientState.localPrediction.predictedVel = { x: 0, y: 0, z: 0 };
      clientState.localPrediction.visualErrorOffset = { x: 0, y: 0, z: 0 };
      clientState.localPrediction.pendingInputs = [];
    }

    eventBus.emit('SOCKET_CONNECTED', { netId: myNetId });
    this.startTickLoop();
  }

  private onEntityLifecycle(ev: IEntityLifecycleEvent): void {
    for (const spawn of ev.spawned ?? []) {
      this.addEntity(spawn);
    }
    for (const netId of ev.despawnedNetIds ?? []) {
      clientState.entities.delete(netId);
    }
  }

  private onWorldDelta(ev: IWorldDeltaEvent): void {
    for (const record of ev.deltas ?? []) {
      this.applyWorldDeltaRecord(record);
    }
  }

  private onVoiceRelay(ev: IVoiceRelayEvent): void {
    eventBus.emit('VOICE_RELAY', {
      speakerNetId: ev.speakerNetId ?? 0,
      originXMm: ev.originXMm ?? 0,
      originZMm: ev.originZMm ?? 0,
      opusChunk: ev.opusChunk ?? new Uint8Array(0),
      chunkSeq: ev.chunkSeq ?? 0
    });
  }

  private onNpcStreamChunk(ev: INpcStreamChunkEvent): void {
    const npcNetId = ev.npcNetId ?? 0;
    const chunkIndex = ev.chunkIndex ?? 0;
    const textDelta = ev.textDelta ?? '';
    const npc = clientState.entities.get(npcNetId);
    if (npc) {
      if (chunkIndex === 0) npc.streamedTextBuffer = '';
      npc.streamedTextBuffer += textDelta;
      const audioLen = ev.audioChunk?.length ?? 0;
      if (chunkIndex === 0 && textDelta.length === 0 && audioLen === 0 && !ev.isComplete) {
        npc.npcThinking = true;
      } else if (textDelta.length > 0 || ev.isComplete) {
        npc.npcThinking = false;
      }
    }
    eventBus.emit('NPC_STREAM_CHUNK', {
      interactionId: ev.interactionId ?? '',
      npcNetId,
      textDelta,
      audioChunk: ev.audioChunk ?? new Uint8Array(0),
      chunkIndex,
      isComplete: ev.isComplete ?? false
    });
  }

  private onEntityDeltaTick(ev: IEntityDeltaTickEvent): void {
    const now = performance.now();
    clientState.lastServerSnapshotTime = now;
    const tickMs = clientState.serverTick * SNAPSHOT_INTERVAL_MS;
    const offsetSample = now - tickMs;
    clientState.serverClockOffsetMs = Number.isFinite(clientState.serverClockOffsetMs)
      ? clientState.serverClockOffsetMs + (offsetSample - clientState.serverClockOffsetMs) * CLOCK_OFFSET_SMOOTHING
      : offsetSample;
    const ackInputSeq = ev.ackInputSeq ?? 0;

    for (const transform of ev.dirtyEntities ?? []) {
      const netId = transform.netId ?? 0;
      if (netId === clientState.myNetId) {
        this.reconcileLocal(transform, ackInputSeq);
      } else {
        this.applyRemoteTransform(netId, transform, tickMs);
      }
    }
  }

  private applyRemoteTransform(netId: number, transform: IQuantizedEntityTransform, tickMs: number): void {
    const entity = clientState.entities.get(netId);
    if (!entity) return;
    entity.lastSnapshotTime = performance.now();
    entity.prevPos = { ...entity.renderPos };
    entity.targetPos = {
      x: (transform.xMm ?? 0) / 1000,
      y: (transform.yMm ?? 0) / 1000,
      z: (transform.zMm ?? 0) / 1000
    };
    entity.velocity = {
      x: (transform.vxMm ?? 0) / 1000,
      y: (transform.vyMm ?? 0) / 1000,
      z: (transform.vzMm ?? 0) / 1000
    };
    entity.yawRad = (transform.yawMrad ?? 0) / 1000;
    entity.pitchRad = (transform.pitchMrad ?? 0) / 1000;
    entity.headRollRad = (transform.headRollMrad ?? 0) / 1000;
    entity.audioEnergy = (transform.audioEnergyByte ?? 0) / 255;
    entity.faceState = transform.faceState ?? 255;
    entity.actionState = transform.actionState ?? 0;

    const snaps = entity.snapshots;
    const last = snaps.length > 0 ? snaps[snaps.length - 1] : null;
    if (last && tickMs <= last.t) return;
    // Rest gap: hold the old position until one tick before motion resumes so the gap doesn't smear
    if (last && tickMs - last.t > SNAPSHOT_INTERVAL_MS * 2.5) {
      snaps.push({ t: tickMs - SNAPSHOT_INTERVAL_MS, x: last.x, y: last.y, z: last.z, vx: 0, vy: 0, vz: 0 });
    }
    snaps.push({
      t: tickMs,
      x: entity.targetPos.x,
      y: entity.targetPos.y,
      z: entity.targetPos.z,
      vx: entity.velocity.x,
      vy: entity.velocity.y,
      vz: entity.velocity.z
    });
    if (snaps.length > SNAPSHOT_BUFFER_CAP) snaps.splice(0, snaps.length - SNAPSHOT_BUFFER_CAP);
  }

  private reconcileLocal(transform: IQuantizedEntityTransform, ackInputSeq: number): void {
    const lp = clientState.localPrediction;
    const authPos: Vec3 = {
      x: (transform.xMm ?? 0) / 1000,
      y: (transform.yMm ?? 0) / 1000,
      z: (transform.zMm ?? 0) / 1000
    };
    let lerpT = (performance.now() - lp.lastPredictStepTime) / SNAPSHOT_INTERVAL_MS;
    if (lerpT < 0) lerpT = 0;
    else if (lerpT > 1) lerpT = 1;
    const oldVisualPos: Vec3 = {
      x: lp.prevPredictedPos.x + (lp.predictedPos.x - lp.prevPredictedPos.x) * lerpT + lp.visualErrorOffset.x,
      y: lp.prevPredictedPos.y + (lp.predictedPos.y - lp.prevPredictedPos.y) * lerpT + lp.visualErrorOffset.y,
      z: lp.prevPredictedPos.z + (lp.predictedPos.z - lp.prevPredictedPos.z) * lerpT + lp.visualErrorOffset.z
    };

    lp.pendingInputs = lp.pendingInputs.filter((input) => input.seq > ackInputSeq);
    lp.lastAckedSeq = ackInputSeq;

    let pos = authPos;
    let vel: Vec3 = {
      x: (transform.vxMm ?? 0) / 1000,
      y: (transform.vyMm ?? 0) / 1000,
      z: (transform.vzMm ?? 0) / 1000
    };
    const obstacles = gatherEntityObstacles();
    for (const input of lp.pendingInputs) {
      const step = stepSharedKinematics(pos, vel, input.keyBitmask, input.yawMrad, structureTypeAt, obstacles, TICK_DT);
      pos = step.nextPos;
      vel = step.velocity;
    }
    lp.predictedPos = pos;
    lp.prevPredictedPos = { ...pos };
    lp.predictedVel = vel;

    const err: Vec3 = {
      x: oldVisualPos.x - pos.x,
      y: oldVisualPos.y - pos.y,
      z: oldVisualPos.z - pos.z
    };
    lp.visualErrorOffset =
      Math.hypot(err.x, err.z) < RECONCILE_SNAP_THRESHOLD_M ? err : { x: 0, y: 0, z: 0 };

    const netId = transform.netId ?? 0;
    const entity = clientState.entities.get(netId);
    if (entity) {
      entity.targetPos = { ...authPos };
      entity.velocity = { ...vel };
      entity.yawRad = (transform.yawMrad ?? 0) / 1000;
      entity.audioEnergy = (transform.audioEnergyByte ?? 0) / 255;
    }
  }

  private addEntity(spawn: IEntitySpawnInfo): void {
    const netId = spawn.netId ?? 0;
    const pos: Vec3 = {
      x: (spawn.xMm ?? 0) / 1000,
      y: (spawn.yMm ?? 0) / 1000,
      z: (spawn.zMm ?? 0) / 1000
    };
    const entity: RenderableEntity = {
      netId,
      type: spawn.type === proto.EntityType.ENTITY_NPC ? 'NPC' : 'PLAYER',
      displayName: spawn.displayName ?? '',
      prevPos: { ...pos },
      targetPos: { ...pos },
      renderPos: { ...pos },
      lastSnapshotTime: performance.now(),
      snapshots: [],
      velocity: { x: 0, y: 0, z: 0 },
      yawRad: (spawn.yawMrad ?? 0) / 1000,
      pitchRad: 0,
      headRollRad: 0,
      audioEnergy: 0,
      baseColorHex: spawn.baseColorHex ?? 0,
      styleFlags: spawn.styleFlags ?? 0,
      avatarHat: spawn.avatarHat ?? 255,
      avatarEyes: spawn.avatarEyes ?? 255,
      avatarMouth: spawn.avatarMouth ?? 255,
      avatarHair: spawn.avatarHair ?? 255,
      faceState: 255,
      npcThinking: false,
      actionState: 0,
      streamedTextBuffer: ''
    };
    clientState.entities.set(netId, entity);
  }

  private applyWorldDeltaRecord(record: IWorldDeltaRecord): void {
    const gridX = record.gridX ?? 0;
    const gridY = record.gridY ?? 0;
    const gridZ = record.gridZ ?? 0;
    const structureType = record.structureType ?? 0;
    const key = worldDeltaKey(gridX, gridY, gridZ);
    if (structureType === 0) {
      clientState.worldDeltas.delete(key);
      return;
    }
    clientState.worldDeltas.set(key, {
      key,
      gridX,
      gridY,
      gridZ,
      structureType,
      stateFlags: record.stateFlags ?? 0
    });
  }

  private handleClose(): void {
    clientState.connected = false;
    this.stopTickLoop();
    this.socket = null;
    eventBus.emit('SOCKET_CLOSED', undefined);
  }
}
