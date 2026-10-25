import { clientState } from '../core/store';
import { eventBus } from '../core/events';
import { NPC_INTERACT_RANGE } from '../core/constants';

const CSS = `
.vb-chat {
  position: fixed; left: 50%; bottom: 96px; transform: translateX(-50%) translateY(8px);
  z-index: 8; width: min(520px, 92vw); display: none; opacity: 0;
  flex-direction: column; gap: 4px; pointer-events: auto; transition: opacity .15s, transform .15s;
  font-family: Georgia, 'Times New Roman', serif;
}
.vb-chat.on { display: flex; opacity: 1; transform: translateX(-50%) translateY(0); }
.vb-chat .vb-chat-to { font-size: 11px; letter-spacing: 1px; color: #cbb188; padding-left: 4px; }
.vb-chat .vb-chat-to b { color: #deb887; }
.vb-chat .vb-chat-row {
  display: flex; gap: 8px; align-items: center; padding: 8px 10px; border-radius: 9px;
  border: 1px solid #b08d57;
  background: linear-gradient(170deg, rgba(59,47,34,0.62) 0%, rgba(32,25,16,0.68) 100%);
  -webkit-backdrop-filter: blur(14px) saturate(1.15); backdrop-filter: blur(14px) saturate(1.15);
  box-shadow: 0 6px 22px rgba(0,0,0,0.5), inset 0 1px 0 rgba(222,184,135,0.25);
}
.vb-chat input {
  flex: 1; padding: 8px 10px; font-size: 15px; font-family: inherit;
  color: #f0dcc0; background: rgba(10,8,5,0.45); border: 1px solid #7a6240; border-radius: 6px; outline: none;
}
.vb-chat input:focus { border-color: #deb887; }
.vb-chat input::placeholder { color: #9a855f; }
.vb-chat button {
  padding: 8px 16px; font-size: 14px; font-family: inherit; cursor: pointer; font-weight: bold;
  color: #1a140c; border-radius: 6px; border: 1px solid #6e532c;
  background: linear-gradient(180deg, #d4af6a 0%, #a97e3f 100%);
}
.vb-chat button:hover { filter: brightness(1.1); }
.vb-chat.nobody .vb-chat-to { color: #c96f4a; }
`;

function stripProfession(name: string): string {
  return name.replace(/\s*\([A-Z_]+\)\s*$/, '').trim() || name;
}

/** Nearest villager you're facing (preferred) or just the nearest one in range. */
function pickTargetNpc(): { netId: number; name: string } | null {
  const me = clientState.localPrediction.predictedPos;
  const yaw = clientState.cameraYawRad;
  const cosP = Math.cos(clientState.cameraPitchRad);
  const fx = Math.sin(yaw) * cosP;
  const fz = -Math.cos(yaw) * cosP;
  const fh = Math.hypot(fx, fz) || 1;
  const nx = fx / fh;
  const nz = fz / fh;
  const rangeSq = NPC_INTERACT_RANGE * NPC_INTERACT_RANGE;
  let gazeBest: { netId: number; name: string } | null = null;
  let gazeDot = 0.55;
  let nearBest: { netId: number; name: string } | null = null;
  let nearD2 = rangeSq;
  for (const e of clientState.entities.values()) {
    if (e.type !== 'NPC') continue;
    const dx = e.renderPos.x - me.x;
    const dz = e.renderPos.z - me.z;
    const d2 = dx * dx + dz * dz;
    if (d2 > rangeSq) continue;
    const dist = Math.sqrt(d2) || 1;
    const dot = (dx / dist) * nx + (dz / dist) * nz;
    const hit = { netId: e.netId, name: stripProfession(e.displayName) };
    if (dot > gazeDot) { gazeDot = dot; gazeBest = hit; }
    if (d2 < nearD2) { nearD2 = d2; nearBest = hit; }
  }
  return gazeBest ?? nearBest;
}

export interface ChatBoxOptions {
  canvas: HTMLCanvasElement;
}

export class ChatBox {
  readonly root: HTMLDivElement;
  private readonly input: HTMLInputElement;
  private readonly toLabel: HTMLDivElement;
  private open = false;
  private target: { netId: number; name: string } | null = null;

  constructor(private readonly opts: ChatBoxOptions) {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    this.root = document.createElement('div');
    this.root.className = 'vb-chat';
    this.root.innerHTML = `
      <div class="vb-chat-to"></div>
      <div class="vb-chat-row">
        <input type="text" maxlength="240" placeholder="Say something to the villager…" autocomplete="off" />
        <button type="button">Send</button>
      </div>`;
    document.body.appendChild(this.root);
    this.input = this.root.querySelector('input')!;
    this.toLabel = this.root.querySelector('.vb-chat-to')!;

    this.root.querySelector('button')!.addEventListener('click', () => this.send());
    // keep keystrokes out of the movement/look controller while typing
    this.input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); this.send(); }
      else if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    });
    window.addEventListener('keydown', this.onKeyDown);
  }

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (!clientState.connected || this.open) return;
    const ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) return;
    if (document.querySelector('.vb-menu.on')) return; // pause menu open
    if (e.code === 'Enter' || e.code === 'KeyT') {
      e.preventDefault();
      this.openBox();
    }
  };

  /** Public entry (keyboard, chat button, mobile). */
  openBox(): void {
    if (this.open || !clientState.connected) return;
    this.open = true;
    clientState.keyBitmask = 0; // stop any held movement
    if (document.pointerLockElement) document.exitPointerLock();
    this.target = pickTargetNpc();
    if (this.target) {
      this.root.classList.remove('nobody');
      this.toLabel.innerHTML = `To <b>${escapeHtml(this.target.name)}</b>`;
    } else {
      this.root.classList.add('nobody');
      this.toLabel.textContent = 'No villager within earshot — walk closer';
    }
    this.root.classList.add('on');
    this.input.value = '';
    this.input.focus();
  }

  private close(): void {
    this.open = false;
    this.root.classList.remove('on');
    this.input.blur();
    try { this.opts.canvas.requestPointerLock(); } catch { /* needs gesture; fine */ }
  }

  private send(): void {
    const text = this.input.value.trim();
    // re-resolve target at send time (NPCs move)
    const target = this.target ?? pickTargetNpc();
    if (text && target) {
      eventBus.emit('SEND_NPC_AUDIO_INTERACT', {
        targetNetId: target.netId,
        chunk: new Uint8Array(0),
        transcriptHint: text,
        isFinal: true
      });
    }
    this.close();
  }

  hide(): void { this.close(); }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}
