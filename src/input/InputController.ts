import { eventBus } from '../core/events';
import { clientState } from '../core/store';
import { settings } from '../core/settings';
import { CAMERA_EYE_HEIGHT, INTERACT_REACH, NPC_INTERACT_RANGE } from '../core/constants';

const MOUSE_SENSITIVITY = 0.0022;
const PITCH_LIMIT_RAD = 1.2;
const TWO_PI = Math.PI * 2;

const KEY_BITS: Readonly<Record<string, number>> = {
  KeyW: 1,
  KeyS: 2,
  KeyA: 4,
  KeyD: 8,
  Space: 16,
  ShiftLeft: 32,
  ShiftRight: 32
};

export class InputController {
  private readonly canvas: HTMLCanvasElement;
  private proximityPttActive = false;
  private npcPttNetId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  attach(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onWindowBlur);
    document.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('click', this.onCanvasClick);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  private get pointerLocked(): boolean {
    return document.pointerLockElement === this.canvas;
  }

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;

    const bit = KEY_BITS[e.code];
    if (bit !== undefined) {
      if (e.code === 'Space') e.preventDefault();
      clientState.keyBitmask |= bit;
      return;
    }

    if (e.code === 'KeyV') {
      if (!this.proximityPttActive) {
        this.proximityPttActive = true;
        eventBus.emit('PTT_PROXIMITY_START', undefined);
      }
      return;
    }

    if (e.code === 'KeyE') {
      if (this.npcPttNetId === null) {
        const npcNetId = this.findClosestNpcNetId();
        if (npcNetId !== null) {
          this.npcPttNetId = npcNetId;
          eventBus.emit('PTT_NPC_START', { npcNetId });
        }
      }
    }
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    const bit = KEY_BITS[e.code];
    if (bit !== undefined) {
      clientState.keyBitmask &= ~bit;
      return;
    }

    if (e.code === 'KeyV') {
      if (this.proximityPttActive) {
        this.proximityPttActive = false;
        eventBus.emit('PTT_PROXIMITY_STOP', undefined);
      }
      return;
    }

    if (e.code === 'KeyE') {
      if (this.npcPttNetId !== null) {
        const npcNetId = this.npcPttNetId;
        this.npcPttNetId = null;
        eventBus.emit('PTT_NPC_STOP', { npcNetId });
      }
    }
  };

  private readonly onWindowBlur = (): void => {
    clientState.keyBitmask = 0;
    if (this.proximityPttActive) {
      this.proximityPttActive = false;
      eventBus.emit('PTT_PROXIMITY_STOP', undefined);
    }
    if (this.npcPttNetId !== null) {
      const npcNetId = this.npcPttNetId;
      this.npcPttNetId = null;
      eventBus.emit('PTT_NPC_STOP', { npcNetId });
    }
  };

  private readonly onCanvasClick = (): void => {
    // Touch devices drive the camera via the on-screen look pad, not pointer lock.
    if (matchMedia('(pointer: coarse)').matches) return;
    if (!this.pointerLocked) {
      this.canvas.requestPointerLock();
    }
  };

  private readonly onMouseMove = (e: MouseEvent): void => {
    if (!this.pointerLocked) return;

    const sens = MOUSE_SENSITIVITY * settings.mouseSensitivity;
    let yaw = clientState.cameraYawRad + e.movementX * sens;
    yaw %= TWO_PI;
    if (yaw > Math.PI) yaw -= TWO_PI;
    else if (yaw < -Math.PI) yaw += TWO_PI;
    clientState.cameraYawRad = yaw;

    const pitch = clientState.cameraPitchRad - e.movementY * sens;
    clientState.cameraPitchRad = Math.min(PITCH_LIMIT_RAD, Math.max(-PITCH_LIMIT_RAD, pitch));
  };

  private readonly onMouseDown = (e: MouseEvent): void => {
    if (!this.pointerLocked) return;
    if (e.button !== 0 && e.button !== 2) return;
    e.preventDefault();

    const hit = this.raycastGroundPlane();
    if (!hit) return;

    eventBus.emit('SEND_WORLD_INTERACT', {
      gridX: Math.floor(hit.x),
      gridY: 0,
      gridZ: Math.floor(hit.z),
      structureType: e.button === 0 ? 1 : 0
    });
  };

  private readonly onContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
  };

  private findClosestNpcNetId(): number | null {
    const playerPos = clientState.localPrediction.predictedPos;
    const rangeSq = NPC_INTERACT_RANGE * NPC_INTERACT_RANGE;
    let closestNetId: number | null = null;
    let closestDistSq = rangeSq;

    for (const entity of clientState.entities.values()) {
      if (entity.type !== 'NPC') continue;
      const dx = entity.targetPos.x - playerPos.x;
      const dz = entity.targetPos.z - playerPos.z;
      const distSq = dx * dx + dz * dz;
      if (distSq <= closestDistSq) {
        closestDistSq = distSq;
        closestNetId = entity.netId;
      }
    }

    return closestNetId;
  }

  private raycastGroundPlane(): { x: number; z: number } | null {
    const { predictedPos, visualErrorOffset } = clientState.localPrediction;
    const eyeX = predictedPos.x + visualErrorOffset.x;
    const eyeY = predictedPos.y + visualErrorOffset.y + CAMERA_EYE_HEIGHT;
    const eyeZ = predictedPos.z + visualErrorOffset.z;

    const yaw = clientState.cameraYawRad;
    const pitch = clientState.cameraPitchRad;
    const cosPitch = Math.cos(pitch);
    const dirX = Math.sin(yaw) * cosPitch;
    const dirY = Math.sin(pitch);
    const dirZ = -Math.cos(yaw) * cosPitch;

    if (dirY === 0) return null;
    const t = -eyeY / dirY;
    if (t <= 0 || t > INTERACT_REACH) return null;

    return { x: eyeX + dirX * t, z: eyeZ + dirZ * t };
  }
}
