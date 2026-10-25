import { clientState } from '../core/store';
import { RenderableEntity } from '../core/types';
import * as Mat4 from './Mat4';
import { Mesh, createMeshFromArrays } from './Primitives';
import { parseObj } from './ObjLoader';

export const PART_NAMES = [
  'torso', 'head',
  'upperArmL', 'forearmL', 'upperArmR', 'forearmR',
  'thighL', 'calfL', 'thighR', 'calfR',
  'handL', 'handR'
] as const;

export const PART_COUNT = PART_NAMES.length;
const PARENTS = [-1, 0, 0, 2, 0, 4, -1, 6, -1, 8, 3, 5];
const PIVOTS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0.95, 0], [0, 1.42, 0],
  [0.24, 1.36, 0], [0.24, 1.08, 0], [-0.24, 1.36, 0], [-0.24, 1.08, 0],
  [0.10, 0.95, 0], [0.10, 0.52, 0], [-0.10, 0.95, 0], [-0.10, 0.52, 0],
  [0.24, 0.78, 0], [-0.24, 0.78, 0]
];
// Geometry mid-points (bind space) and radii used for push-reaction contact tests
const MIDS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1.19, 0], [0, 1.66, 0],
  [0.24, 1.22, 0], [0.24, 0.93, 0], [-0.24, 1.22, 0], [-0.24, 0.93, 0],
  [0.10, 0.74, 0], [0.10, 0.29, 0], [-0.10, 0.74, 0], [-0.10, 0.29, 0],
  [0.24, 0.735, 0], [-0.24, 0.735, 0]
];
const PART_RADII = [0.20, 0.30, 0.10, 0.10, 0.10, 0.10, 0.11, 0.11, 0.11, 0.11, 0.09, 0.09];
// +1: geometry extends above its pivot, -1: hangs below (flips push-to-rotation mapping)
const PART_SIGNS = [1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
// 0 torso tone, 1 limbs slightly darker, 2 head slightly lighter
const PART_SHADE_GROUP = [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export const HAT_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0.16, 0.13, 0.11],
  [0.69, 0.55, 0.34],
  [0.23, 0.33, 0.25],
  [0.42, 0.20, 0.20]
];

export const HEAD_INDEX = 1;
export const FOREARM_R_INDEX = 5;
export const HAND_R_INDEX = 11;
// Bind-space elbow pivot of the right forearm (viewmodel anchor)
export const FOREARM_R_PIVOT: readonly [number, number, number] = [-0.24, 1.08, 0];
export const FACE_ANCHOR: readonly [number, number, number] = [0, 1.66, -0.315];
export const FACE_SIZE = 0.46;

const PUSHER_RADIUS = 0.5;
const SPRING_K = 60.0;
const SPRING_DAMP = 8.0;
const SPRING_IMPULSE = 30.0;
const SPRING_CLAMP = 0.65;
const BLEND_RATE = 9.0;

const scratchJoint = Mat4.create();
const scratchRoot = Mat4.create();

export interface StickStyle {
  bodyScale: number;
  headScale: number;
  hatType: number;
  hatColor: readonly [number, number, number];
  limbShade: number;
  hairStyle: number; // 0 none, 1 long, 2 topknot
  hairColor: readonly [number, number, number];
  eyes: number; // 0 round, 1 wide, 2 sleepy
  mouth: number; // 0 smile, 1 flat, 2 grin
  hasGoggles: boolean;
  hasBackpack: boolean;
  hasMonocle: boolean;
  hasMustache: boolean;
}

export const HAIR_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0.22, 0.14, 0.08],
  [0.45, 0.22, 0.10],
  [0.12, 0.10, 0.09],
  [0.84, 0.68, 0.36] // honey blonde — kept distinct from tan skin
];

interface StickState {
  phase: number;
  move: number;
  run: number;
  air: number;
  surprise: number;
  blinkTimer: number;
  displayYaw: number;
  rx: Float32Array;
  rz: Float32Array;
  ax: Float32Array;
  az: Float32Array;
  vax: Float32Array;
  vaz: Float32Array;
  matrices: Float32Array;
  expression: number;
  style: StickStyle;
}

export function partShadeGroup(index: number): number {
  return PART_SHADE_GROUP[index];
}

function createState(netId: number): StickState {
  const h = (Math.imul(netId + 13, 2654435761) ^ 0x9e3779b9) >>> 0;
  const f = (shift: number): number => ((h >>> shift) & 255) / 255;
  return {
    phase: (netId % 7) * 0.9,
    move: 0,
    run: 0,
    air: 0,
    surprise: 0,
    blinkTimer: 1.5 + (netId % 5) * 0.7,
    displayYaw: Number.NaN,
    rx: new Float32Array(PART_COUNT),
    rz: new Float32Array(PART_COUNT),
    ax: new Float32Array(PART_COUNT),
    az: new Float32Array(PART_COUNT),
    vax: new Float32Array(PART_COUNT),
    vaz: new Float32Array(PART_COUNT),
    matrices: new Float32Array(PART_COUNT * 16),
    expression: 0,
    style: {
      bodyScale: 0.90 + f(3) * 0.22,
      headScale: 0.90 + f(11) * 0.24,
      hatType: (h >>> 26) & 3,
      hatColor: HAT_PALETTE[(h >>> 22) & 3],
      limbShade: 0.78 + f(17) * 0.14,
      hairStyle: 0,
      hairColor: HAIR_PALETTE[(h >>> 19) & 3],
      eyes: 0,
      mouth: 0,
      hasGoggles: ((h >>> 14) & 7) < 3,   // ~40% of characters wear goggles
      hasBackpack: ((h >>> 9) & 7) < 2,   // ~25% wear a brass air tank
      hasMonocle: false,                  // set from styleFlags (mayor)
      hasMustache: false                  // set from styleFlags (mayor)
    }
  };
}

function rotationAtPivot(
  out: Float32Array,
  rx: number,
  rz: number,
  px: number,
  py: number,
  pz: number,
  scale = 1
): Float32Array {
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cz = Math.cos(rz), sz = Math.sin(rz);
  out[0] = cz * scale; out[1] = cx * sz * scale; out[2] = sx * sz * scale; out[3] = 0;
  out[4] = -sz * scale; out[5] = cx * cz * scale; out[6] = sx * cz * scale; out[7] = 0;
  out[8] = 0; out[9] = -sx * scale; out[10] = cx * scale; out[11] = 0;
  const rpx = (cz * px - sz * py) * scale;
  const rpy = (cx * sz * px + cx * cz * py - sx * pz) * scale;
  const rpz = (sx * sz * px + sx * cz * py + cx * pz) * scale;
  out[12] = px - rpx; out[13] = py - rpy; out[14] = pz - rpz; out[15] = 1;
  return out;
}

export class StickmanRig {
  ready = false;
  meshes: Mesh[] = [];
  private readonly gl: WebGL2RenderingContext;
  private readonly states = new Map<number, StickState>();

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  async load(): Promise<void> {
    const response = await fetch('/models/stickman.obj');
    if (!response.ok) throw new Error(`stickman.obj fetch failed: ${response.status}`);
    const parts = parseObj(await response.text());
    const byName = new Map(parts.map((p) => [p.name, p]));
    this.meshes = PART_NAMES.map((name) => {
      const part = byName.get(name);
      if (!part) throw new Error(`stickman.obj missing part: ${name}`);
      return createMeshFromArrays(this.gl, part.vertices, part.indices);
    });
    this.ready = true;
  }

  prune(): void {
    for (const netId of this.states.keys()) {
      if (!clientState.entities.has(netId)) this.states.delete(netId);
    }
  }

  getMatrices(netId: number): Float32Array | null {
    return this.states.get(netId)?.matrices ?? null;
  }

  getExpression(netId: number): number {
    return this.states.get(netId)?.expression ?? 0;
  }

  getStyle(netId: number): StickStyle | null {
    return this.states.get(netId)?.style ?? null;
  }

  getFaceCombo(netId: number): number {
    const style = this.states.get(netId)?.style;
    return style ? style.eyes * 3 + style.mouth : 0;
  }

  update(entity: RenderableEntity, dt: number, now: number): StickState {
    let s = this.states.get(entity.netId);
    if (!s) {
      s = createState(entity.netId);
      this.states.set(entity.netId, s);
    }
    s.style.hairStyle = entity.avatarHair !== 255
      ? Math.min(2, entity.avatarHair)
      : ((entity.styleFlags & 1) !== 0 ? 1 : 0);
    // avatarHat 0-4 = standard hats, 5 = clockwork top hat (mayor); 255 = procedural (hash)
    if (entity.avatarHat !== 255) {
      s.style.hatType = Math.min(5, entity.avatarHat);
    } else if ((entity.styleFlags & 1) !== 0 && (entity.netId & 3) !== 0) {
      // keep most women bare-headed so the long hair shows (≈25% still wear a hash hat)
      s.style.hatType = 0;
    }
    s.style.eyes = entity.avatarEyes !== 255 ? Math.min(2, entity.avatarEyes) : 0;
    s.style.mouth = entity.avatarMouth !== 255 ? Math.min(2, entity.avatarMouth) : 0;
    // styleFlags: bit 1 female, bit 2 monocle, bit 4 mustache (profession signatures)
    s.style.hasMonocle = (entity.styleFlags & 2) !== 0;
    s.style.hasMustache = (entity.styleFlags & 4) !== 0;
    if (s.style.hasMonocle) s.style.hasGoggles = false; // monocle replaces goggles

    const speed = Math.hypot(entity.velocity.x, entity.velocity.z);
    const moveTarget = Math.min(1, speed / 6.0);
    const runTarget = Math.min(1, Math.max(0, (speed - 6.0) / 4.0));
    const airTarget = Math.abs(entity.velocity.y) > 0.3 || entity.renderPos.y > 0.08 ? airFromY(entity) : 0;
    const blend = Math.min(1, dt * BLEND_RATE);
    s.move += (moveTarget - s.move) * blend;
    s.run += (runTarget - s.run) * blend;
    s.air += (airTarget - s.air) * blend;

    if (!Number.isFinite(s.displayYaw)) s.displayYaw = entity.yawRad;
    const yawTarget = speed > 0.4 ? Math.atan2(entity.velocity.x, -entity.velocity.z) : entity.yawRad;
    let yawDelta = yawTarget - s.displayYaw;
    yawDelta = Math.atan2(Math.sin(yawDelta), Math.cos(yawDelta));
    s.displayYaw += yawDelta * Math.min(1, dt * 10);

    s.phase += dt * (5.0 + speed * 1.5) * (1.0 - s.air * 0.75);
    s.surprise *= Math.exp(-2.5 * dt);
    s.blinkTimer -= dt;
    if (s.blinkTimer < -0.13) s.blinkTimer = 2.2 + ((entity.netId * 7 + Math.floor(now / 1000)) % 5) * 0.6;

    this.applyPushSprings(entity, s, dt);
    this.computeAngles(entity, s, now);
    this.computeMatrices(entity, s);
    this.pickExpression(entity, s, now);
    return s;
  }

  private applyPushSprings(entity: RenderableEntity, s: StickState, dt: number): void {
    const yaw = s.displayYaw;
    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    for (const other of clientState.entities.values()) {
      if (other.netId === entity.netId) continue;
      const cdx = other.renderPos.x - entity.renderPos.x;
      const cdz = other.renderPos.z - entity.renderPos.z;
      if (cdx * cdx + cdz * cdz > 2.25) continue;
      for (let i = 0; i < PART_COUNT; i++) {
        const m = s.matrices;
        const base = i * 16;
        const [lx, ly, lz] = MIDS[i];
        const wx = m[base] * lx + m[base + 4] * ly + m[base + 8] * lz + m[base + 12];
        const wy = m[base + 1] * lx + m[base + 5] * ly + m[base + 9] * lz + m[base + 13];
        const wz = m[base + 2] * lx + m[base + 6] * ly + m[base + 10] * lz + m[base + 14];
        if (Math.abs(wy - (other.renderPos.y + ly)) > 1.0) continue;
        const dx = wx - other.renderPos.x;
        const dz = wz - other.renderPos.z;
        const dist = Math.hypot(dx, dz);
        const pen = PART_RADII[i] + PUSHER_RADIUS - dist;
        if (pen <= 0 || dist < 1e-4) continue;
        const px = dx / dist, pz = dz / dist;
        const localX = px * cosY + pz * sinY;
        const localZ = -px * sinY + pz * cosY;
        const pusherSpeed = Math.hypot(other.velocity.x, other.velocity.z);
        const impulse = pen * SPRING_IMPULSE * (1 + pusherSpeed * 0.12) * dt * PART_SIGNS[i];
        s.vax[i] += localZ * impulse;
        s.vaz[i] -= localX * impulse;
        s.surprise = Math.min(1, s.surprise + pen * 4.0 * dt);
      }
    }
    for (let i = 0; i < PART_COUNT; i++) {
      s.vax[i] += (-SPRING_K * s.ax[i] - SPRING_DAMP * s.vax[i]) * dt;
      s.vaz[i] += (-SPRING_K * s.az[i] - SPRING_DAMP * s.vaz[i]) * dt;
      s.ax[i] = Math.max(-SPRING_CLAMP, Math.min(SPRING_CLAMP, s.ax[i] + s.vax[i] * dt));
      s.az[i] = Math.max(-SPRING_CLAMP, Math.min(SPRING_CLAMP, s.az[i] + s.vaz[i] * dt));
    }
  }

  private computeAngles(entity: RenderableEntity, s: StickState, now: number): void {
    const stride = Math.sin(s.phase);
    const amp = s.move * (0.55 + 0.3 * s.run);
    const breath = Math.sin(now * 0.0016 + entity.netId) * 0.025 * (1 - s.move);
    const lean = s.run * 0.22 - s.air * 0.1 + breath;
    const legSwing = stride * amp;
    const kneeL = Math.max(0, -Math.sin(s.phase - 0.6)) * (0.8 * s.move + 0.35 * s.run);
    const kneeR = Math.max(0, -Math.sin(s.phase + Math.PI - 0.6)) * (0.8 * s.move + 0.35 * s.run);
    const armSwing = -stride * s.move * (0.45 + 0.35 * s.run);
    const elbowL = 0.2 + Math.max(0, Math.sin(s.phase)) * 0.35 * s.move + s.air * 0.4;
    const elbowR = 0.2 + Math.max(0, -Math.sin(s.phase)) * 0.35 * s.move + s.air * 0.4;
    const armRaise = s.air * 1.7;
    const talk = entity.audioEnergy * 0.12;
    const idle = (1 - s.move) * (1 - s.air);
    const idleSway = Math.sin(now * 0.0011 + entity.netId * 1.7) * idle;
    const idleArm = Math.sin(now * 0.0014 + entity.netId * 2.3) * idle;

    s.rx[0] = lean;
    s.rz[0] = stride * 0.045 * s.move + idleSway * 0.035;
    s.rx[1] = -lean * 0.55 + Math.sin(s.phase * 2) * 0.03 * s.move + talk + entity.pitchRad * 0.6;
    s.rz[1] = entity.headRollRad;
    s.rx[2] = armSwing - s.air * 0.3 + idleArm * 0.05;
    s.rz[2] = 0.07 + armRaise + 0.05 * idle + idleSway * 0.04;
    s.rx[3] = elbowL + idleArm * 0.06;
    s.rz[3] = 0;
    s.rx[4] = -armSwing - s.air * 0.3 - idleArm * 0.05;
    s.rz[4] = -0.07 - armRaise - 0.05 * idle + idleSway * 0.04;
    s.rx[5] = elbowR - idleArm * 0.06;
    s.rz[5] = 0;
    s.rx[6] = legSwing + s.air * 0.65;
    s.rz[6] = 0;
    s.rx[7] = -kneeL - s.air * 1.1;
    s.rz[7] = 0;
    s.rx[8] = -legSwing + s.air * 0.65;
    s.rz[8] = 0;
    s.rx[9] = -kneeR - s.air * 1.1;
    s.rz[9] = 0;
    s.rx[10] = 0;
    s.rz[10] = 0;
    s.rx[11] = 0;
    s.rz[11] = 0;

    // Profession work cycles override arm/torso motion while standing at a work spot
    if (entity.actionState > 0 && s.move < 0.35) {
      const wp = s.phase;
      // Arm direction from a shoulder is (0, -cos rx, -sin rx); forward (-Z, toward the
      // work focus the villager faces) needs POSITIVE rx. All poses swing forward.
      if (entity.actionState === 1) {
        // two-handed chop: raise overhead (up-forward), swing down to a low-forward strike
        const swing = (Math.sin(wp * 1.6) + 1) / 2;
        const armX = 2.5 - swing * 2.0; // overhead -> low front
        s.rx[2] = armX; s.rz[2] = 0.22;
        s.rx[4] = armX; s.rz[4] = -0.22;
        s.rx[3] = 0.6 - swing * 0.3;
        s.rx[5] = 0.6 - swing * 0.3;
        s.rx[0] = 0.1 + swing * 0.3; // lean into the downstroke
        s.rx[1] = 0.1 + swing * 0.15;
      } else if (entity.actionState === 2) {
        // hammering: right arm raises then strikes down-forward, left arm braces
        const strike = (Math.sin(wp * 2.3) + 1) / 2;
        s.rx[4] = 1.5 - strike * 1.1; // up-forward -> down-forward
        s.rz[4] = -0.12;
        s.rx[5] = 0.6;
        s.rx[2] = 0.7; s.rz[2] = 0.1;
        s.rx[3] = 0.7;
        s.rx[0] = 0.18 + strike * 0.1;
      } else if (entity.actionState === 3) {
        // farming: stooped forward, arms reaching down-forward, sweeping side to side
        const sweep = Math.sin(wp * 1.2);
        s.rx[0] = 0.6; // stoop forward
        s.rx[1] = -0.2;
        s.rx[2] = 1.0 + sweep * 0.2; s.rz[2] = 0.18;
        s.rx[4] = 1.0 - sweep * 0.2; s.rz[4] = -0.18;
        s.rx[3] = 0.4;
        s.rx[5] = 0.4;
      } else {
        // tinkering: hands up in front, small fiddling motion
        const fiddle = Math.sin(wp * 3.1) * 0.12;
        s.rx[2] = 1.05 + fiddle; s.rz[2] = 0.12;
        s.rx[4] = 1.05 - fiddle; s.rz[4] = -0.12;
        s.rx[3] = 0.9;
        s.rx[5] = 0.9;
        s.rx[1] = 0.12;
      }
    }
  }

  private computeMatrices(entity: RenderableEntity, s: StickState): void {
    const bob = Math.abs(Math.sin(s.phase)) * 0.05 * s.move * (1 - s.air);
    const bs = s.style.bodyScale;
    Mat4.fromTranslationRotationScale(
      scratchRoot,
      entity.renderPos.x,
      entity.renderPos.y + bob,
      entity.renderPos.z,
      s.displayYaw,
      bs, bs, bs
    );
    for (let i = 0; i < PART_COUNT; i++) {
      const [px, py, pz] = PIVOTS[i];
      rotationAtPivot(
        scratchJoint,
        s.rx[i] + s.ax[i],
        s.rz[i] + s.az[i],
        px, py, pz,
        i === HEAD_INDEX ? s.style.headScale : 1
      );
      const parent = PARENTS[i] === -1 ? scratchRoot : s.matrices.subarray(PARENTS[i] * 16, PARENTS[i] * 16 + 16);
      Mat4.multiply(s.matrices.subarray(i * 16, i * 16 + 16), parent, scratchJoint);
    }
  }

  private pickExpression(entity: RenderableEntity, s: StickState, now: number): void {
    // Webcam-driven expression relayed from that player's client wins over procedural
    if (entity.faceState !== 255) {
      s.expression = Math.min(5, Math.max(0, entity.faceState));
      return;
    }
    const talking = entity.audioEnergy > 0.06 || entity.streamedTextBuffer.length > 0;
    if (s.surprise > 0.3) {
      s.expression = 3;
    } else if (talking) {
      s.expression = Math.floor(now / 140) % 2 === 0 ? 2 : 0;
    } else if (s.blinkTimer < 0) {
      s.expression = 1;
    } else {
      s.expression = 0;
    }
  }
}

function airFromY(entity: RenderableEntity): number {
  // Standing still on a structure top keeps vy == 0 — only treat vertical motion as airborne
  return Math.abs(entity.velocity.y) > 0.3 ? 1 : 0;
}

export function buildFaceAtlas(gl: WebGL2RenderingContext): WebGLTexture {
  // Columns: 6 expressions (neutral, blink, talk, surprised, smile, frown).
  // Rows: 9 avatar combos (eyes 0..2 x mouth 0..2, combo = eyes*3 + mouth).
  const cell = 128;
  const canvas = document.createElement('canvas');
  canvas.width = cell * 6;
  canvas.height = cell * 9;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable for face atlas');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = 'round';

  const ink = '#15120e';
  const drawEyes = (ox: number, oy: number, mode: 'round' | 'wide' | 'sleepy' | 'closed' | 'surprised') => {
    for (const ex of [ox + 38, ox + 90]) {
      const ey = oy + 52;
      if (mode === 'closed') {
        ctx.strokeStyle = ink;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(ex - 14, ey);
        ctx.lineTo(ex + 14, ey);
        ctx.stroke();
        continue;
      }
      const wide = mode === 'wide' || mode === 'surprised';
      const r = wide ? 20 : 16;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = ink;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(ex, ey, r, r * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(ex, ey + (wide ? 0 : 3), wide ? 9 : 7, 0, Math.PI * 2);
      ctx.fill();
      if (mode === 'sleepy') {
        ctx.fillRect(ex - r - 3, ey - r * 1.1 - 3, (r + 3) * 2, r * 1.05);
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(ex - r - 1, ey - 2);
        ctx.lineTo(ex + r + 1, ey - 2);
        ctx.stroke();
      }
    }
  };
  const drawMouth = (ox: number, oy: number, mode: 'smile' | 'flat' | 'grin' | 'open' | 'o' | 'frown') => {
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 7;
    const mx = ox + 64;
    const my = oy + 92;
    ctx.beginPath();
    if (mode === 'smile') {
      ctx.arc(mx, my - 8, 20, 0.25 * Math.PI, 0.75 * Math.PI);
      ctx.stroke();
    } else if (mode === 'flat') {
      ctx.moveTo(mx - 18, my + 2);
      ctx.lineTo(mx + 18, my + 2);
      ctx.stroke();
    } else if (mode === 'open') {
      ctx.ellipse(mx, my, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (mode === 'o') {
      ctx.ellipse(mx, my, 10, 13, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (mode === 'grin') {
      ctx.beginPath();
      ctx.arc(mx, my - 12, 26, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(mx - 15, my - 1, 30, 6);
      ctx.fillStyle = ink;
    } else {
      ctx.arc(mx, my + 14, 20, 1.25 * Math.PI, 1.75 * Math.PI);
      ctx.stroke();
    }
  };

  const eyeShapes: ReadonlyArray<'round' | 'wide' | 'sleepy'> = ['round', 'wide', 'sleepy'];
  const mouthShapes: ReadonlyArray<'smile' | 'flat' | 'grin'> = ['smile', 'flat', 'grin'];
  for (let eyes = 0; eyes < 3; eyes++) {
    for (let mouth = 0; mouth < 3; mouth++) {
      const oy = (eyes * 3 + mouth) * cell;
      const baseEye = eyeShapes[eyes];
      const baseMouth = mouthShapes[mouth];
      // expression columns: neutral, blink, talk, surprised, smile, frown
      drawEyes(0 * cell, oy, baseEye); drawMouth(0 * cell, oy, baseMouth);
      drawEyes(1 * cell, oy, 'closed'); drawMouth(1 * cell, oy, baseMouth);
      drawEyes(2 * cell, oy, baseEye); drawMouth(2 * cell, oy, 'open');
      drawEyes(3 * cell, oy, 'surprised'); drawMouth(3 * cell, oy, 'o');
      drawEyes(4 * cell, oy, baseEye); drawMouth(4 * cell, oy, 'grin');
      drawEyes(5 * cell, oy, baseEye); drawMouth(5 * cell, oy, 'frown');
    }
  }

  const texture = gl.createTexture();
  if (!texture) throw new Error('Failed to create face texture');
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}
