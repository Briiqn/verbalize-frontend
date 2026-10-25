import { clientState } from '../core/store';
import { settings } from '../core/settings';

// key bits (mirror InputController KEY_BITS)
const W = 1, S = 2, A = 4, D = 8, JUMP = 16, SPRINT = 32;
const LOOK_SENS = 0.0055;   // rad per px of drag
const PITCH_LIMIT = 1.2;
const TWO_PI = Math.PI * 2;
const DEAD = 0.28;          // joystick dead zone (fraction of radius)
const JOY_RADIUS = 58;      // px

const CSS = `
.vb-mobile { position: fixed; inset: 0; z-index: 7; display: none; touch-action: none;
  font-family: Georgia, 'Times New Roman', serif; }
.vb-mobile.on { display: block; }
.vb-mobile .zone { position: absolute; top: 0; bottom: 0; width: 50%; pointer-events: auto; }
.vb-mobile .zone.left { left: 0; }
.vb-mobile .zone.right { right: 0; }
.vb-joy { position: absolute; width: ${JOY_RADIUS * 2}px; height: ${JOY_RADIUS * 2}px; margin: ${-JOY_RADIUS}px 0 0 ${-JOY_RADIUS}px;
  border-radius: 50%; display: none; pointer-events: none;
  background: radial-gradient(circle, rgba(59,47,34,0.4) 0%, rgba(32,25,16,0.3) 70%, transparent 72%);
  border: 2px solid rgba(176,141,87,0.6);
  -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.vb-joy.on { display: block; }
.vb-joy .knob { position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; margin: -23px 0 0 -23px;
  border-radius: 50%; background: linear-gradient(180deg, rgba(212,175,106,0.9), rgba(169,126,63,0.9));
  border: 1px solid #6e532c; box-shadow: 0 2px 8px rgba(0,0,0,0.5); }
.vb-btn { position: absolute; pointer-events: auto; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; color: #f0dcc0; border: 1px solid #b08d57; user-select: none; -webkit-user-select: none;
  background: linear-gradient(170deg, rgba(59,47,34,0.55), rgba(32,25,16,0.62));
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: 0 3px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(222,184,135,0.25); }
.vb-btn:active { filter: brightness(1.25); }
.vb-jump { right: 28px; bottom: 40px; width: 82px; height: 82px; font-size: 15px; letter-spacing: 1px; }
.vb-gear { top: 14px; right: 14px; width: 46px; height: 46px; font-size: 22px; }
.vb-chatbtn { right: 70px; bottom: 150px; width: 58px; height: 58px; font-size: 24px; }
.vb-hint { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%);
  color: #cbb188; font-size: 12px; opacity: 0.8; pointer-events: none; text-align: center; white-space: nowrap; }
`;

export interface MobileControlsOptions {
  onMenu: () => void;
  onChat: () => void;
}

export class MobileControls {
  readonly root: HTMLDivElement;
  private readonly joy: HTMLDivElement;
  private moveBits = 0;
  private jumpBit = 0;
  private moveTouchId: number | null = null;
  private joyCx = 0;
  private joyCy = 0;
  private lookTouchId: number | null = null;
  private lookX = 0;
  private lookY = 0;

  static isTouch(): boolean {
    return matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  }

  constructor(private readonly opts: MobileControlsOptions) {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    this.root = document.createElement('div');
    this.root.className = 'vb-mobile';
    this.root.innerHTML = `
      <div class="zone left"><div class="vb-joy"><div class="knob"></div></div></div>
      <div class="zone right"></div>
      <div class="vb-btn vb-jump">JUMP</div>
      <div class="vb-btn vb-chatbtn">&#128172;</div>
      <div class="vb-btn vb-gear">&#9881;</div>
      <div class="vb-hint">Left: move &middot; Right: look &middot; Look at a villager to talk, or tap &#128172; to type</div>`;
    document.body.appendChild(this.root);

    const left = this.root.querySelector<HTMLDivElement>('.zone.left')!;
    const right = this.root.querySelector<HTMLDivElement>('.zone.right')!;
    this.joy = this.root.querySelector<HTMLDivElement>('.vb-joy')!;

    left.addEventListener('touchstart', this.onMoveStart, { passive: false });
    left.addEventListener('touchmove', this.onMoveMove, { passive: false });
    left.addEventListener('touchend', this.onMoveEnd);
    left.addEventListener('touchcancel', this.onMoveEnd);

    right.addEventListener('touchstart', this.onLookStart, { passive: false });
    right.addEventListener('touchmove', this.onLookMove, { passive: false });
    right.addEventListener('touchend', this.onLookEnd);
    right.addEventListener('touchcancel', this.onLookEnd);

    const jump = this.root.querySelector<HTMLDivElement>('.vb-jump')!;
    jump.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); this.jumpBit = JUMP; this.apply(); }, { passive: false });
    const clearJump = (e: Event) => { e.preventDefault(); this.jumpBit = 0; this.apply(); };
    jump.addEventListener('touchend', clearJump);
    jump.addEventListener('touchcancel', clearJump);

    const gear = this.root.querySelector<HTMLDivElement>('.vb-gear')!;
    gear.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); this.opts.onMenu(); }, { passive: false });

    const chatBtn = this.root.querySelector<HTMLDivElement>('.vb-chatbtn')!;
    chatBtn.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); this.opts.onChat(); }, { passive: false });
  }

  show(): void { this.root.classList.add('on'); }
  hide(): void {
    this.root.classList.remove('on');
    this.reset();
  }

  private reset(): void {
    this.moveBits = 0; this.jumpBit = 0; this.moveTouchId = null; this.lookTouchId = null;
    this.joy.classList.remove('on');
    this.apply();
  }

  private apply(): void {
    clientState.keyBitmask = this.moveBits | this.jumpBit;
  }

  // ---- movement joystick ----
  private readonly onMoveStart = (e: TouchEvent): void => {
    if (this.moveTouchId !== null) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    this.moveTouchId = t.identifier;
    this.joyCx = t.clientX;
    this.joyCy = t.clientY;
    this.joy.style.left = `${t.clientX}px`;
    this.joy.style.top = `${t.clientY}px`;
    this.joy.classList.add('on');
    this.updateJoyKnob(0, 0);
  };

  private readonly onMoveMove = (e: TouchEvent): void => {
    if (this.moveTouchId === null) return;
    const t = this.findTouch(e, this.moveTouchId);
    if (!t) return;
    e.preventDefault();
    let dx = t.clientX - this.joyCx;
    let dy = t.clientY - this.joyCy;
    const mag = Math.hypot(dx, dy);
    const clamped = Math.min(mag, JOY_RADIUS);
    if (mag > 0) { dx = (dx / mag) * clamped; dy = (dy / mag) * clamped; }
    this.updateJoyKnob(dx, dy);

    const nx = dx / JOY_RADIUS;
    const ny = dy / JOY_RADIUS;
    let bits = 0;
    if (ny < -DEAD) bits |= W;
    if (ny > DEAD) bits |= S;
    if (nx < -DEAD) bits |= A;
    if (nx > DEAD) bits |= D;
    if (clamped / JOY_RADIUS > 0.82 && bits !== 0) bits |= SPRINT;
    this.moveBits = bits;
    this.apply();
  };

  private readonly onMoveEnd = (e: TouchEvent): void => {
    if (this.moveTouchId === null || !this.touchEnded(e, this.moveTouchId)) return;
    this.moveTouchId = null;
    this.moveBits = 0;
    this.joy.classList.remove('on');
    this.apply();
  };

  private updateJoyKnob(dx: number, dy: number): void {
    const knob = this.joy.firstElementChild as HTMLElement;
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  // ---- look pad ----
  private readonly onLookStart = (e: TouchEvent): void => {
    if (this.lookTouchId !== null) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    this.lookTouchId = t.identifier;
    this.lookX = t.clientX;
    this.lookY = t.clientY;
  };

  private readonly onLookMove = (e: TouchEvent): void => {
    if (this.lookTouchId === null) return;
    const t = this.findTouch(e, this.lookTouchId);
    if (!t) return;
    e.preventDefault();
    const sens = LOOK_SENS * settings.mouseSensitivity;
    const dx = t.clientX - this.lookX;
    const dy = t.clientY - this.lookY;
    this.lookX = t.clientX;
    this.lookY = t.clientY;

    let yaw = clientState.cameraYawRad + dx * sens;
    yaw %= TWO_PI;
    if (yaw > Math.PI) yaw -= TWO_PI;
    else if (yaw < -Math.PI) yaw += TWO_PI;
    clientState.cameraYawRad = yaw;
    clientState.cameraPitchRad = Math.min(PITCH_LIMIT, Math.max(-PITCH_LIMIT, clientState.cameraPitchRad - dy * sens));
  };

  private readonly onLookEnd = (e: TouchEvent): void => {
    if (this.lookTouchId !== null && this.touchEnded(e, this.lookTouchId)) this.lookTouchId = null;
  };

  private findTouch(e: TouchEvent, id: number): Touch | null {
    for (let i = 0; i < e.touches.length; i++) if (e.touches[i].identifier === id) return e.touches[i];
    return null;
  }

  private touchEnded(e: TouchEvent, id: number): boolean {
    for (let i = 0; i < e.changedTouches.length; i++) if (e.changedTouches[i].identifier === id) return true;
    return false;
  }
}
