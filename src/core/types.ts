export const SERVER_TPS = 20;
export const TICK_DT = 1.0 / SERVER_TPS; // 0.05s (50ms)
export const WALK_SPEED = 6.0;
export const SPRINT_SPEED = 10.0;

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface InputSample {
  seq: number;
  keyBitmask: number;
  yawMrad: number;
  pitchMrad: number;
  micEnergyByte: number;
}

export interface EntitySnapshot {
  t: number; // server-tick time in ms (tick * 50)
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export interface RenderableEntity {
  netId: number;
  type: 'PLAYER' | 'NPC';
  displayName: string;
  prevPos: Vec3;
  targetPos: Vec3;
  renderPos: Vec3;
  lastSnapshotTime: number; // per-entity interp clock; a global clock snaps entities missing from a delta back to prevPos
  snapshots: EntitySnapshot[]; // server-tick-stamped buffer for delayed interpolation
  velocity: Vec3;
  yawRad: number;
  pitchRad: number; // relayed camera pitch (head tilt); 0 for NPCs
  headRollRad: number; // relayed webcam head roll
  audioEnergy: number; // 0.0..1.0
  baseColorHex: number;
  styleFlags: number; // bit 1 = female (long hair)
  avatarHat: number; // 255 = not customized
  avatarEyes: number;
  avatarMouth: number;
  avatarHair: number;
  faceState: number; // relayed webcam expression cell; 255 = procedural
  npcThinking: boolean; // reply is being composed (typing indicator)
  actionState: number; // villager work animation: 0 none, 1 chop, 2 hammer, 3 farm, 4 tinker
  streamedTextBuffer: string;
}

export interface LocalPlayerPredictionState {
  predictedPos: Vec3;
  prevPredictedPos: Vec3; // Previous tick's predicted position, lerped toward predictedPos each render frame
  lastPredictStepTime: number;
  predictedVel: Vec3;
  visualErrorOffset: Vec3; // Decays toward 0 every render frame
  pendingInputs: InputSample[]; // Unacknowledged inputs (max 128)
  lastAckedSeq: number;
}

export interface WorldDelta {
  key: string;
  gridX: number;
  gridY: number;
  gridZ: number;
  structureType: number;
  stateFlags: number;
}

export interface ClientState {
  myNetId: number | null;
  worldSeed: bigint;
  connected: boolean;
  serverTick: number;
  lastServerSnapshotTime: number;
  serverClockOffsetMs: number; // EMA of (performance.now() - serverTick*50); NaN until first delta
  nextInputSeq: number;
  cameraYawRad: number;
  cameraPitchRad: number;
  keyBitmask: number;
  micEnergyByte: number;
  faceState: number; // local webcam expression cell 0..5; 255 = tracking off
  headRollMrad: number; // local webcam head roll; 0 = tracking off
  reputation: number; // 0..100 standing with the villagers, from the server
  localPrediction: LocalPlayerPredictionState;
  entities: Map<number, RenderableEntity>;
  worldDeltas: Map<string, WorldDelta>;
}
