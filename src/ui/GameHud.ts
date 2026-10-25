import { eventBus } from '../core/events';
import { settings } from '../core/settings';

const HUD_CSS = `
.vb-hud { position: fixed; inset: 0; pointer-events: none; z-index: 6;
  font-family: Georgia, 'Times New Roman', serif; }

/* Reputation meter — frosted card, top-centre */
.vb-rep {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  display: none; flex-direction: column; gap: 5px; width: min(300px, 62vw); box-sizing: border-box; padding: 9px 14px 11px;
  border-radius: 10px; border: 1px solid #b08d57;
  background: linear-gradient(170deg, rgba(59,47,34,0.5) 0%, rgba(32,25,16,0.58) 100%);
  -webkit-backdrop-filter: blur(13px) saturate(1.15); backdrop-filter: blur(13px) saturate(1.15);
  box-shadow: 0 4px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(222,184,135,0.25);
}
.vb-rep.on { display: flex; }
.vb-rep .vb-rep-head { display: flex; justify-content: space-between; align-items: baseline;
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #cbb188; }
.vb-rep .vb-rep-val { font-size: 13px; color: #f0dcc0; letter-spacing: 1px; }
.vb-rep .vb-rep-track { height: 9px; border-radius: 5px; overflow: hidden;
  background: rgba(10,8,5,0.6); border: 1px solid #4a3a28; }
.vb-rep .vb-rep-fill { height: 100%; width: 50%; border-radius: 4px;
  transition: width 0.6s cubic-bezier(.4,1.3,.5,1), background-color 0.6s; }
.vb-rep-toast {
  position: absolute; top: 62px; left: 50%; transform: translateX(-50%) translateY(-6px);
  padding: 5px 12px; border-radius: 6px; font-size: 13px; white-space: nowrap;
  background: rgba(23,17,9,0.55); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  border: 1px solid #7a6240; opacity: 0; transition: opacity .3s, transform .3s; }
.vb-rep-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.vb-rep-toast.up { color: #9fe08a; border-color: #4f7a3a; }
.vb-rep-toast.down { color: #ff9f7a; border-color: #a2503a; }

/* ESC pause menu */
.vb-menu { position: absolute; inset: 0; display: none; align-items: center; justify-content: center;
  pointer-events: auto; background: rgba(10,8,5,0.45);
  -webkit-backdrop-filter: blur(7px); backdrop-filter: blur(7px); }
.vb-menu.on { display: flex; }
.vb-menu .vb-card {
  display: flex; flex-direction: column; gap: 14px; width: min(340px, 88vw); box-sizing: border-box; padding: 26px 30px;
  border-radius: 12px; border: 2px solid #b08d57; color: #f0dcc0;
  background: linear-gradient(170deg, rgba(59,47,34,0.72) 0%, rgba(32,25,16,0.8) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(1.1); backdrop-filter: blur(18px) saturate(1.1);
  box-shadow: 0 0 0 4px rgba(26,20,12,0.6), 0 10px 40px rgba(0,0,0,0.6); }
.vb-menu h2 { margin: 0; text-align: center; font-size: 22px; letter-spacing: 3px; color: #deb887;
  text-shadow: 0 2px 6px rgba(0,0,0,0.8); }
.vb-menu .vb-sect { margin: 2px 0 -2px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: #8f7352; border-bottom: 1px solid #4a3a28; padding-bottom: 3px; }
.vb-menu .vb-slider { display: flex; flex-direction: column; gap: 3px; font-size: 13px; color: #cbb188; }
.vb-menu .vb-slider .vb-slabel { display: flex; justify-content: space-between; }
.vb-menu input[type=range] { width: 100%; accent-color: #d4af6a; cursor: pointer; }
.vb-menu button {
  padding: 11px 12px; font-size: 15px; font-family: inherit; cursor: pointer; letter-spacing: 1px;
  border-radius: 6px; border: 1px solid #6e532c; }
.vb-menu button.vb-primary { color: #1a140c; font-weight: bold;
  background: linear-gradient(180deg, #d4af6a 0%, #a97e3f 100%); }
.vb-menu button.vb-primary:hover { filter: brightness(1.1); }
.vb-menu button.vb-danger { color: #ffd9cb; background: rgba(120,46,34,0.55);
  border-color: #a2503a; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.vb-menu button.vb-danger:hover { background: rgba(150,56,40,0.7); }
`;

function repColor(v: number): string {
  // red (0) -> amber (50) -> green (100)
  const t = Math.max(0, Math.min(100, v)) / 100;
  const stops: Array<[number, number, number, number]> = [
    [0, 192, 57, 43],
    [0.5, 212, 175, 106],
    [1, 106, 176, 76]
  ];
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i][0] && t <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  }
  const f = (t - a[0]) / Math.max(1e-6, b[0] - a[0]);
  const r = Math.round(a[1] + (b[1] - a[1]) * f);
  const g = Math.round(a[2] + (b[2] - a[2]) * f);
  const bl = Math.round(a[3] + (b[3] - a[3]) * f);
  return `rgb(${r},${g},${bl})`;
}

function standingLabel(v: number): string {
  if (v >= 80) return 'Beloved';
  if (v >= 60) return 'Liked';
  if (v >= 40) return 'Neutral';
  if (v >= 20) return 'Distrusted';
  return 'Despised';
}

export interface GameHudOptions {
  canvas: HTMLCanvasElement;
  onDisconnect: () => void;
}

export class GameHud {
  readonly root: HTMLDivElement;
  private readonly repEl: HTMLDivElement;
  private readonly repFill: HTMLDivElement;
  private readonly repVal: HTMLSpanElement;
  private readonly repLabel: HTMLSpanElement;
  private readonly toast: HTMLDivElement;
  private readonly menu: HTMLDivElement;
  private toastTimer: number | null = null;
  private menuOpen = false;

  constructor(private readonly opts: GameHudOptions) {
    const style = document.createElement('style');
    style.textContent = HUD_CSS;
    document.head.appendChild(style);

    this.root = document.createElement('div');
    this.root.className = 'vb-hud';
    this.root.innerHTML = `
      <div class="vb-rep">
        <div class="vb-rep-head"><span>Village reputation</span><span class="vb-rep-val"></span></div>
        <div class="vb-rep-track"><div class="vb-rep-fill"></div></div>
      </div>
      <div class="vb-rep-toast"></div>
      <div class="vb-menu">
        <div class="vb-card">
          <h2>PAUSED</h2>
          <p class="vb-sect">Settings</p>
          <label class="vb-slider" data-s="vol">
            <span class="vb-slabel"><span>Master volume</span><span class="vb-sv"></span></span>
            <input type="range" min="0" max="100" step="1" />
          </label>
          <label class="vb-slider" data-s="sens">
            <span class="vb-slabel"><span>Look sensitivity</span><span class="vb-sv"></span></span>
            <input type="range" min="20" max="250" step="5" />
          </label>
          <button class="vb-primary" data-a="resume" type="button">Resume</button>
          <button class="vb-danger" data-a="disconnect" type="button">Disconnect</button>
        </div>
      </div>`;
    document.body.appendChild(this.root);

    this.repEl = this.root.querySelector('.vb-rep')!;
    this.repFill = this.root.querySelector('.vb-rep-fill')!;
    this.repVal = this.root.querySelector('.vb-rep-val')!;
    this.repLabel = this.root.querySelector('.vb-rep-head span')!;
    this.toast = this.root.querySelector('.vb-rep-toast')!;
    this.menu = this.root.querySelector('.vb-menu')!;

    this.wireMenu();
    eventBus.on('REPUTATION', ({ reputation, delta, reason }) => this.setReputation(reputation, delta, reason));
    window.addEventListener('keydown', this.onKeyDown);
  }

  private wireMenu(): void {
    const vol = this.menu.querySelector<HTMLInputElement>('[data-s="vol"] input')!;
    const volVal = this.menu.querySelector<HTMLSpanElement>('[data-s="vol"] .vb-sv')!;
    const sens = this.menu.querySelector<HTMLInputElement>('[data-s="sens"] input')!;
    const sensVal = this.menu.querySelector<HTMLSpanElement>('[data-s="sens"] .vb-sv')!;
    vol.value = String(Math.round(settings.masterVolume * 100));
    sens.value = String(Math.round(settings.mouseSensitivity * 100));
    const paintVol = () => { volVal.textContent = `${vol.value}%`; };
    const paintSens = () => { sensVal.textContent = `${sens.value}%`; };
    paintVol(); paintSens();
    vol.addEventListener('input', () => { settings.setMasterVolume(Number(vol.value) / 100); paintVol(); });
    sens.addEventListener('input', () => { settings.mouseSensitivity = Number(sens.value) / 100; paintSens(); });

    this.menu.querySelector('[data-a="resume"]')!.addEventListener('click', () => this.closeMenu(true));
    this.menu.querySelector('[data-a="disconnect"]')!.addEventListener('click', () => {
      this.closeMenu(false);
      this.opts.onDisconnect();
    });
  }

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.code !== 'Escape') return;
    if (this.repEl.classList.contains('on') || this.menuOpen) {
      e.preventDefault();
      if (this.menuOpen) this.closeMenu(true);
      else this.openMenu();
    }
  };

  /** Opened by the ESC key (desktop) or the on-screen gear button (mobile). */
  openMenu(): void {
    this.menuOpen = true;
    this.menu.classList.add('on');
    if (document.pointerLockElement) document.exitPointerLock();
  }

  private closeMenu(relock: boolean): void {
    this.menuOpen = false;
    this.menu.classList.remove('on');
    if (relock) {
      try { this.opts.canvas.requestPointerLock(); } catch { /* needs a gesture; ignore */ }
    }
  }

  show(): void { this.repEl.classList.add('on'); }

  hide(): void {
    this.repEl.classList.remove('on');
    this.menu.classList.remove('on');
    this.menuOpen = false;
  }

  setReputation(value: number, delta: number, reason: string): void {
    const v = Math.max(0, Math.min(100, value));
    this.repFill.style.width = `${v}%`;
    this.repFill.style.backgroundColor = repColor(v);
    this.repVal.textContent = `${standingLabel(v)} · ${v}`;
    if (delta !== 0 && reason) this.flashToast(delta, reason);
  }

  private flashToast(delta: number, reason: string): void {
    this.toast.textContent = `${reason} (${delta > 0 ? '+' : ''}${delta})`;
    this.toast.className = `vb-rep-toast show ${delta > 0 ? 'up' : 'down'}`;
    if (this.toastTimer !== null) clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => { this.toast.classList.remove('show'); }, 2600);
  }
}
