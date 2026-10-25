import { ClientState } from './types';

export function createClientState(): ClientState {
  return {
    myNetId: null,
    worldSeed: 0n,
    connected: false,
    serverTick: 0,
    lastServerSnapshotTime: 0,
    serverClockOffsetMs: Number.NaN,
    nextInputSeq: 0,
    cameraYawRad: 0,
    cameraPitchRad: 0,
    keyBitmask: 0,
    micEnergyByte: 0,
    faceState: 255,
    headRollMrad: 0,
    reputation: 100,
    localPrediction: {
      predictedPos: { x: 0, y: 0, z: 0 },
      prevPredictedPos: { x: 0, y: 0, z: 0 },
      lastPredictStepTime: 0,
      predictedVel: { x: 0, y: 0, z: 0 },
      visualErrorOffset: { x: 0, y: 0, z: 0 },
      pendingInputs: [],
      lastAckedSeq: 0
    },
    entities: new Map(),
    worldDeltas: new Map()
  };
}

export const clientState: ClientState = createClientState();

export function worldDeltaKey(gridX: number, gridY: number, gridZ: number): string {
  return `${gridX},${gridY},${gridZ}`;
}
