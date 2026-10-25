import { eventBus } from './core/events';
import { Renderer } from './renderer/Renderer';
import { NetworkClient } from './network/NetworkClient';
import { InputController } from './input/InputController';
import { AudioEngine } from './audio/AudioEngine';
import { GameHud } from './ui/GameHud';
import { MobileControls } from './ui/MobileControls';
import { ChatBox } from './ui/ChatBox';
import { LoginBackground } from './ui/LoginBackground';

interface SavedAccount {
  username: string;
  password: string;
}

const ACCOUNTS_COOKIE = 'verbalize_accounts';

function readSavedAccounts(): SavedAccount[] {
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${ACCOUNTS_COOKIE}=`));
  if (!match) return [];
  try {
    const parsed = JSON.parse(atob(decodeURIComponent(match.slice(ACCOUNTS_COOKIE.length + 1))));
    if (Array.isArray(parsed)) {
      return parsed.filter((a) => typeof a?.username === 'string' && typeof a?.password === 'string');
    }
  } catch {
    // corrupt cookie — treat as empty
  }
  return [];
}

function writeSavedAccounts(accounts: SavedAccount[]): void {
  const value = encodeURIComponent(btoa(JSON.stringify(accounts.slice(0, 12))));
  document.cookie = `${ACCOUNTS_COOKIE}=${value}; max-age=31536000; path=/; SameSite=Lax`;
}

function upsertSavedAccount(account: SavedAccount): void {
  const accounts = readSavedAccounts().filter((a) => a.username.toLowerCase() !== account.username.toLowerCase());
  accounts.unshift(account);
  writeSavedAccounts(accounts);
}

const OVERLAY_CSS = `
#verbalize-login {
  position: fixed; inset: 0; z-index: 10; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at center, #2a2018 0%, #0d0b08 75%);
  font-family: Georgia, 'Times New Roman', serif;
}
#verbalize-login canvas.bgfx {
  position: absolute; inset: 0; width: 100%; height: 100%; filter: brightness(0.75) saturate(0.9);
}
#verbalize-login .panel { position: relative; z-index: 1; }
#verbalize-login .acctlist { display: flex; flex-direction: column; gap: 4px; }
#verbalize-login .acctrow {
  display: flex; align-items: center; gap: 8px; padding: 7px 10px;
  background: #171109; border: 1px solid #4a3a28; border-radius: 5px;
  color: #e8d5b5; font-size: 14px; cursor: pointer;
}
#verbalize-login .acctrow:hover { border-color: #b08d57; background: #241c12; }
#verbalize-login .acctrow .acctname { flex: 1; }
#verbalize-login .acctrow .acctdel {
  background: none; border: none; color: #8f7352; cursor: pointer; font-size: 15px; padding: 0 4px;
}
#verbalize-login .acctrow .acctdel:hover { color: #c96f4a; }
#verbalize-login .panel-inner-title { margin: 2px 0 0; }
#verbalize-login .panel {
  display: flex; flex-direction: column; gap: 12px; align-items: stretch;
  padding: 30px 38px; width: min(420px, 92vw); max-height: 92vh; overflow-y: auto;
  box-sizing: border-box;
  background: linear-gradient(170deg, rgba(59, 47, 34, 0.68) 0%, rgba(36, 28, 18, 0.76) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(1.1); backdrop-filter: blur(16px) saturate(1.1);
  border: 2px solid #b08d57; border-radius: 10px;
  box-shadow: 0 0 0 4px rgba(26, 20, 12, 0.6), 0 0 48px rgba(176, 141, 87, 0.25), inset 0 1px 0 rgba(222, 184, 135, 0.35);
}
#verbalize-login h1 {
  margin: 0; text-align: center; font-size: 28px; letter-spacing: 3px;
  color: #deb887; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}
#verbalize-login .sub {
  margin: 0 0 6px; text-align: center; font-size: 12px; letter-spacing: 2px;
  color: #8f7352; text-transform: uppercase;
}
#verbalize-login input[type=text], #verbalize-login input[type=password] {
  padding: 10px 12px; font-size: 16px; font-family: inherit;
  color: #f0dcc0; background: #171109;
  border: 1px solid #7a6240; border-radius: 5px; outline: none;
}
#verbalize-login input:focus { border-color: #deb887; box-shadow: 0 0 8px rgba(222, 184, 135, 0.35); }
#verbalize-login button.primary {
  padding: 11px 12px; font-size: 16px; font-family: inherit; cursor: pointer;
  color: #1a140c; font-weight: bold; letter-spacing: 1px;
  background: linear-gradient(180deg, #d4af6a 0%, #a97e3f 100%);
  border: 1px solid #6e532c; border-radius: 5px;
}
#verbalize-login button.primary:hover { filter: brightness(1.1); }
#verbalize-login button:disabled { filter: grayscale(0.6) brightness(0.7); cursor: wait; }
#verbalize-login .status { min-height: 16px; margin: 0; text-align: center; font-size: 13px; color: #c96f4a; }
#verbalize-login .whoami { margin: 0; text-align: center; font-size: 13px; color: #c9b08a; }
#verbalize-login .whoami a { color: #deb887; cursor: pointer; text-decoration: underline; }
#verbalize-login .sect {
  margin: 4px 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: #8f7352; border-bottom: 1px solid #4a3a28; padding-bottom: 3px;
}
#verbalize-login .roomlist {
  display: flex; flex-direction: column; gap: 4px; max-height: 150px; overflow-y: auto;
  background: #171109; border: 1px solid #4a3a28; border-radius: 5px; padding: 5px;
}
#verbalize-login .roomrow {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 4px; cursor: pointer; border: 1px solid transparent;
  color: #e8d5b5; font-size: 14px;
}
#verbalize-login .roomrow:hover { background: #241c12; }
#verbalize-login .roomrow.sel { border-color: #deb887; background: #2d2315; }
#verbalize-login .roomrow .meta { font-size: 12px; color: #8f7352; }
#verbalize-login .roomctl { display: flex; gap: 8px; align-items: center; }
#verbalize-login .roomctl input[type=text] { flex: 1; font-size: 13px; padding: 7px 9px; text-transform: uppercase; }
#verbalize-login .opt {
  display: flex; align-items: center; gap: 7px; font-size: 13px; color: #c9b08a; cursor: pointer; white-space: nowrap;
}
#verbalize-login .opt input { accent-color: #b08d57; width: 15px; height: 15px; cursor: pointer; }
#verbalize-login button.small {
  padding: 6px 12px; font-size: 13px; background: #3b2f22; color: #deb887;
  border: 1px solid #7a6240; border-radius: 4px; cursor: pointer; font-family: inherit;
}
#verbalize-login .avatar-editor { display: flex; gap: 14px; }
#verbalize-login .avatar-editor canvas {
  width: 132px; height: 164px; background: #171109;
  border: 1px solid #4a3a28; border-radius: 6px; flex-shrink: 0;
}
#verbalize-login .avatar-controls { display: flex; flex-direction: column; gap: 6px; flex: 1; }
#verbalize-login .avrow { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #c9b08a; }
#verbalize-login .avrow .avlabel { width: 46px; font-size: 12px; color: #8f7352; }
#verbalize-login .avrow .avvalue { flex: 1; text-align: center; color: #e8d5b5; font-size: 13px; }
#verbalize-login .avrow button.avbtn {
  padding: 1px 9px; font-size: 12px; background: #3b2f22; color: #deb887;
  border: 1px solid #7a6240; border-radius: 4px; cursor: pointer;
}
#verbalize-login .swatches { display: flex; gap: 5px; flex-wrap: wrap; }
#verbalize-login .swatches .sw {
  width: 20px; height: 20px; border-radius: 4px; border: 2px solid #1a140c; cursor: pointer; padding: 0;
}
#verbalize-login .swatches .sw.sel { border-color: #f0dcc0; }
@media (max-width: 520px) {
  #verbalize-login .panel { padding: 20px 18px; gap: 10px; border-radius: 8px; }
  #verbalize-login h1 { font-size: 23px; }
  #verbalize-login .avatar-editor { flex-direction: column; align-items: center; }
  #verbalize-login input[type=text], #verbalize-login input[type=password] { font-size: 16px; }
}
`;

interface AvatarChoice {
  hat: number;
  bodyColorHex: number;
  eyes: number;
  mouth: number;
  hair: number;
  touched: boolean;
}

const HAT_NAMES = ['None', 'Top hat', 'Bowler', 'Flat cap', 'Paddy hat'];
const EYE_NAMES = ['Round', 'Wide', 'Sleepy'];
const MOUTH_NAMES = ['Smile', 'Flat', 'Grin'];
const HAIR_NAMES = ['Short', 'Long', 'Topknot'];
const BODY_SWATCHES = [0x5a7fb0, 0xb0645a, 0x5ab06e, 0xb0975a, 0x8a5ab0, 0x5aa6b0, 0xb05a93, 0x7d8a93, 0xc9a76f, 0x4f6b4a];

function hexCss(c: number): string {
  return `#${c.toString(16).padStart(6, '0')}`;
}

function shade(c: number, f: number): string {
  const r = Math.min(255, Math.round(((c >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((c >> 8) & 255) * f));
  const b = Math.min(255, Math.round((c & 255) * f));
  return `rgb(${r},${g},${b})`;
}

function drawAvatarPreview(canvas: HTMLCanvasElement, av: AvatarChoice): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const ink = '#15120e';
  const cx = w / 2;
  const headY = h * 0.30;
  const headR = w * 0.19;
  const body = hexCss(av.bodyColorHex);
  const hairColor = '#3a2415';

  const outlined = (draw: () => void, fill: string) => {
    ctx.fillStyle = fill;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    draw();
    ctx.fill();
    ctx.stroke();
  };

  // hair behind head
  if (av.hair === 1) {
    outlined(() => {
      ctx.moveTo(cx - headR - 4, headY - 4);
      ctx.quadraticCurveTo(cx - headR - 9, headY + headR * 2.1, cx - headR * 0.5, headY + headR * 2.3);
      ctx.lineTo(cx + headR * 0.5, headY + headR * 2.3);
      ctx.quadraticCurveTo(cx + headR + 9, headY + headR * 2.1, cx + headR + 4, headY - 4);
      ctx.arc(cx, headY - 2, headR + 5, 0, Math.PI, true);
    }, hairColor);
  }

  // legs
  for (const side of [-1, 1]) {
    outlined(() => {
      ctx.roundRect(cx + side * w * 0.09 - w * 0.045, h * 0.70, w * 0.09, h * 0.24, 6);
    }, shade(av.bodyColorHex, 0.82));
  }
  // torso
  outlined(() => {
    ctx.roundRect(cx - w * 0.14, h * 0.46, w * 0.28, h * 0.28, 12);
  }, body);
  // arms
  for (const side of [-1, 1]) {
    outlined(() => {
      ctx.roundRect(cx + side * w * 0.195 - w * 0.04, h * 0.475, w * 0.08, h * 0.22, 7);
    }, shade(av.bodyColorHex, 0.82));
  }
  // head
  outlined(() => {
    ctx.arc(cx, headY, headR, 0, Math.PI * 2);
  }, shade(av.bodyColorHex, 1.12));

  // topknot
  if (av.hair === 2) {
    outlined(() => {
      ctx.arc(cx, headY - headR - 7, 8, 0, Math.PI * 2);
    }, hairColor);
    outlined(() => {
      ctx.arc(cx, headY, headR + 2, Math.PI * 1.15, Math.PI * 1.85);
      ctx.closePath();
    }, hairColor);
  }
  if (av.hair === 1) {
    // front fringe hint
    outlined(() => {
      ctx.arc(cx, headY - 2, headR + 3, Math.PI * 1.1, Math.PI * 1.9);
      ctx.closePath();
    }, hairColor);
  }

  // face
  const eyeY = headY - 2;
  for (const side of [-1, 1]) {
    const ex = cx + side * headR * 0.45;
    const wide = av.eyes === 1;
    const r = wide ? 6.5 : 5.2;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(ex, eyeY, r, r * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(ex, eyeY + (wide ? 0 : 1), wide ? 3 : 2.4, 0, Math.PI * 2);
    ctx.fill();
    if (av.eyes === 2) {
      ctx.fillStyle = shade(av.bodyColorHex, 1.12);
      ctx.fillRect(ex - r - 1.5, eyeY - r * 1.2 - 1, (r + 1.5) * 2, r * 1.05);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(ex - r, eyeY - 1);
      ctx.lineTo(ex + r, eyeY - 1);
      ctx.stroke();
    }
  }
  const mouthY = headY + headR * 0.45;
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  if (av.mouth === 0) {
    ctx.arc(cx, mouthY - 3, 7.5, 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
  } else if (av.mouth === 1) {
    ctx.moveTo(cx - 7, mouthY + 1);
    ctx.lineTo(cx + 7, mouthY + 1);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(cx, mouthY - 4, 9, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 5.5, mouthY - 3, 11, 2.6);
  }

  // hats
  const hatColor = '#2b2420';
  const brass = '#b08d57';
  const hatBase = headY - headR + 2;
  if (av.hat === 1) {
    outlined(() => { ctx.roundRect(cx - headR - 6, hatBase - 3, (headR + 6) * 2, 5, 2); }, hatColor);
    outlined(() => { ctx.roundRect(cx - headR * 0.62, hatBase - 26, headR * 1.24, 24, 3); }, hatColor);
    ctx.fillStyle = brass;
    ctx.fillRect(cx - headR * 0.62, hatBase - 9, headR * 1.24, 4);
  } else if (av.hat === 2) {
    outlined(() => { ctx.roundRect(cx - headR - 4, hatBase - 2, (headR + 4) * 2, 4, 2); }, hatColor);
    outlined(() => {
      ctx.arc(cx, hatBase - 1, headR * 0.75, Math.PI, 0);
      ctx.closePath();
    }, hatColor);
  } else if (av.hat === 3) {
    outlined(() => {
      ctx.ellipse(cx, hatBase - 3, headR * 0.95, 6.5, 0, 0, Math.PI * 2);
    }, hatColor);
  } else if (av.hat === 4) {
    outlined(() => {
      ctx.moveTo(cx - headR - 9, hatBase + 3);
      ctx.lineTo(cx, hatBase - 20);
      ctx.lineTo(cx + headR + 9, hatBase + 3);
      ctx.closePath();
    }, '#c9a76f');
  }
}

interface RoomInfo {
  code: string;
  name: string;
  players: number;
}

function buildLoginOverlay(onEnter: (username: string, password: string, roomCode: string, faceTracking: boolean, avatar: AvatarChoice) => void): {
  root: HTMLDivElement;
  setStatus: (msg: string) => void;
  setBusy: (busy: boolean) => void;
  showRoomScreen: () => void;
  backgroundStart: () => void;
  backgroundStop: () => void;
} {
  const style = document.createElement('style');
  style.textContent = OVERLAY_CSS;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'verbalize-login';
  const bgCanvas = document.createElement('canvas');
  bgCanvas.className = 'bgfx';
  root.appendChild(bgCanvas);
  const background = new LoginBackground(bgCanvas);
  background.start();
  root.insertAdjacentHTML('beforeend', `
    <div class="panel">
      <h1>VERBALIZE</h1>
      <p class="sub">Socializing like the 1830's</p>

      <div id="vb-screen-auth" style="display:flex;flex-direction:column;gap:12px">
        <div id="vb-accounts-sect" style="display:none;flex-direction:column;gap:6px">
          <p class="sect">Saved accounts</p>
          <div class="acctlist" id="vb-acctlist"></div>
          <p class="sect">Or sign in</p>
        </div>
        <input id="vb-username" type="text" maxlength="24" placeholder="Operator name" autocomplete="off" />
        <input id="vb-password" type="password" maxlength="64" placeholder="Password (registers if new)" autocomplete="off" />
        <button id="vb-login" class="primary" type="button">Log in / Register</button>
      </div>

      <div id="vb-screen-rooms" style="display:none;flex-direction:column;gap:12px">
        <p class="whoami">Logged in as <b id="vb-who"></b> &middot; <a id="vb-logout">switch</a></p>
        <p class="sect">Rooms</p>
        <div class="roomlist" id="vb-roomlist"></div>
        <div class="roomctl">
          <input id="vb-roomcode" type="text" maxlength="6" placeholder="Or enter a code" autocomplete="off" />
          <label class="opt"><input id="vb-private" type="checkbox" /> private</label>
          <button id="vb-create" class="small" type="button">Create room</button>
        </div>
        <p class="sect">Your avatar</p>
        <div class="avatar-editor">
          <canvas id="vb-preview" width="132" height="164"></canvas>
          <div class="avatar-controls">
            <div class="avrow" data-field="hat"><span class="avlabel">Hat</span><button class="avbtn" data-dir="-1">&#9664;</button><span class="avvalue">None</span><button class="avbtn" data-dir="1">&#9654;</button></div>
            <div class="avrow" data-field="eyes"><span class="avlabel">Eyes</span><button class="avbtn" data-dir="-1">&#9664;</button><span class="avvalue">Round</span><button class="avbtn" data-dir="1">&#9654;</button></div>
            <div class="avrow" data-field="mouth"><span class="avlabel">Mouth</span><button class="avbtn" data-dir="-1">&#9664;</button><span class="avvalue">Smile</span><button class="avbtn" data-dir="1">&#9654;</button></div>
            <div class="avrow" data-field="hair"><span class="avlabel">Hair</span><button class="avbtn" data-dir="-1">&#9664;</button><span class="avvalue">Short</span><button class="avbtn" data-dir="1">&#9654;</button></div>
            <div class="swatches" id="vb-swatches"></div>
          </div>
        </div>
        <label class="opt"><input id="vb-face" type="checkbox" /> Real facial expressions (webcam, local inference)</label>
        <button id="vb-enter" class="primary" type="button">Enter Village</button>
      </div>

      <p class="status" id="vb-status"></p>
    </div>
  `);
  document.body.appendChild(root);

  const $ = <T extends HTMLElement>(id: string): T => root.querySelector<T>(`#${id}`)!;
  const authScreen = $('vb-screen-auth') as HTMLDivElement;
  const roomScreen = $('vb-screen-rooms') as HTMLDivElement;
  const usernameInput = $('vb-username') as HTMLInputElement;
  const passwordInput = $('vb-password') as HTMLInputElement;
  const loginBtn = $('vb-login') as HTMLButtonElement;
  const status = $('vb-status') as HTMLParagraphElement;
  const who = $('vb-who') as HTMLElement;
  const roomListEl = $('vb-roomlist') as HTMLDivElement;
  const roomCodeInput = $('vb-roomcode') as HTMLInputElement;
  const privateBox = $('vb-private') as HTMLInputElement;
  const createBtn = $('vb-create') as HTMLButtonElement;
  const preview = $('vb-preview') as HTMLCanvasElement;
  const faceBox = $('vb-face') as HTMLInputElement;
  const enterBtn = $('vb-enter') as HTMLButtonElement;

  const avatar: AvatarChoice = { hat: 0, bodyColorHex: BODY_SWATCHES[0], eyes: 0, mouth: 0, hair: 0, touched: false };
  let credentials = { username: '', password: '' };
  let selectedRoom = '';
  let roomsTimer: number | null = null;

  const setStatus = (msg: string) => { status.textContent = msg; };
  const redraw = () => drawAvatarPreview(preview, avatar);

  const accountsSect = $('vb-accounts-sect') as HTMLDivElement;
  const accountList = $('vb-acctlist') as HTMLDivElement;
  let doLogin: (username: string, password: string) => void = () => {};

  const renderSavedAccounts = () => {
    const accounts = readSavedAccounts();
    accountsSect.style.display = accounts.length > 0 ? 'flex' : 'none';
    accountList.innerHTML = '';
    for (const account of accounts) {
      const row = document.createElement('div');
      row.className = 'acctrow';
      const name = document.createElement('span');
      name.className = 'acctname';
      name.textContent = account.username;
      const del = document.createElement('button');
      del.className = 'acctdel';
      del.type = 'button';
      del.textContent = '×';
      del.title = 'Forget this account';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        writeSavedAccounts(readSavedAccounts().filter((a) => a.username !== account.username));
        renderSavedAccounts();
      });
      row.append(name, del);
      row.addEventListener('click', () => doLogin(account.username, account.password));
      accountList.appendChild(row);
    }
  };

  const optionNames: Record<string, string[]> = { hat: HAT_NAMES, eyes: EYE_NAMES, mouth: MOUTH_NAMES, hair: HAIR_NAMES };
  const valueSpans: Record<string, HTMLSpanElement> = {};
  for (const row of root.querySelectorAll<HTMLDivElement>('.avrow')) {
    const field = row.dataset.field as 'hat' | 'eyes' | 'mouth' | 'hair';
    const names = optionNames[field];
    const value = row.querySelector<HTMLSpanElement>('.avvalue')!;
    valueSpans[field] = value;
    for (const btn of row.querySelectorAll<HTMLButtonElement>('.avbtn')) {
      btn.addEventListener('click', () => {
        avatar[field] = ((avatar[field] + Number(btn.dataset.dir)) % names.length + names.length) % names.length;
        avatar.touched = true;
        value.textContent = names[avatar[field]];
        redraw();
      });
    }
  }
  const swatches = $('vb-swatches') as HTMLDivElement;
  const swatchButtons: HTMLButtonElement[] = [];
  for (const color of BODY_SWATCHES) {
    const sw = document.createElement('button');
    sw.type = 'button';
    sw.className = 'sw';
    sw.style.background = hexCss(color);
    sw.addEventListener('click', () => {
      avatar.bodyColorHex = color;
      avatar.touched = true;
      for (const other of swatchButtons) other.classList.remove('sel');
      sw.classList.add('sel');
      redraw();
    });
    swatchButtons.push(sw);
    swatches.appendChild(sw);
  }

  const syncAvatarUi = () => {
    for (const field of ['hat', 'eyes', 'mouth', 'hair'] as const) {
      valueSpans[field].textContent = optionNames[field][avatar[field]];
    }
    for (const [i, sw] of swatchButtons.entries()) {
      sw.classList.toggle('sel', BODY_SWATCHES[i] === avatar.bodyColorHex);
    }
    redraw();
  };

  const refreshRooms = () => {
    fetch('/api/rooms')
      .then((r) => r.json())
      .then((rooms: RoomInfo[]) => {
        roomListEl.innerHTML = '';
        for (const room of rooms) {
          const row = document.createElement('div');
          row.className = 'roomrow' + (room.code === selectedRoom || (room.code === 'LOBBY' && selectedRoom === '') ? ' sel' : '');
          row.innerHTML = `<span>${room.name}</span><span class="meta">${room.code} &middot; ${room.players} online</span>`;
          row.addEventListener('click', () => {
            selectedRoom = room.code === 'LOBBY' ? '' : room.code;
            roomCodeInput.value = selectedRoom;
            for (const other of roomListEl.children) other.classList.remove('sel');
            row.classList.add('sel');
          });
          roomListEl.appendChild(row);
        }
      })
      .catch(() => {});
  };

  const showAuth = () => {
    authScreen.style.display = 'flex';
    roomScreen.style.display = 'none';
    setStatus('');
    renderSavedAccounts();
    if (roomsTimer !== null) window.clearInterval(roomsTimer);
    roomsTimer = null;
  };
  const showRooms = () => {
    authScreen.style.display = 'none';
    roomScreen.style.display = 'flex';
    who.textContent = credentials.username;
    setStatus('');
    syncAvatarUi();
    refreshRooms();
    if (roomsTimer === null) roomsTimer = window.setInterval(refreshRooms, 5000);
  };

  doLogin = (username: string, password: string) => {
    if (!username) { setStatus('Enter an operator name.'); return; }
    if (password.length < 4) { setStatus('Password must be at least 4 characters.'); return; }
    loginBtn.disabled = true;
    setStatus('Checking credentials…');
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.error ?? `HTTP ${r.status}`);
        credentials = { username: body.username, password };
        upsertSavedAccount({ username: body.username, password });
        if (body.avatar) {
          avatar.hat = body.avatar.hat;
          avatar.bodyColorHex = body.avatar.bodyColorHex;
          avatar.eyes = body.avatar.eyes;
          avatar.mouth = body.avatar.mouth;
          avatar.hair = body.avatar.hair;
          avatar.touched = false;
        }
        showRooms();
      })
      .catch((err) => setStatus(String(err.message ?? err)))
      .finally(() => { loginBtn.disabled = false; });
  };

  loginBtn.addEventListener('click', () => doLogin(usernameInput.value.trim(), passwordInput.value));
  for (const el of [usernameInput, passwordInput]) {
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginBtn.click(); });
  }

  ($('vb-logout') as HTMLElement).addEventListener('click', showAuth);

  createBtn.addEventListener('click', () => {
    createBtn.disabled = true;
    fetch('/api/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${credentials.username}'s room`, private: privateBox.checked })
    })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.error ?? `HTTP ${r.status}`);
        selectedRoom = body.code;
        roomCodeInput.value = body.code;
        setStatus(`Room ${body.code} created (${body.private ? 'private — share the code' : 'public'}).`);
        refreshRooms();
      })
      .catch((err) => setStatus(`Room creation failed: ${err.message}`))
      .finally(() => { createBtn.disabled = false; });
  });

  roomCodeInput.addEventListener('input', () => {
    selectedRoom = roomCodeInput.value.trim().toUpperCase();
  });

  enterBtn.addEventListener('click', () => {
    onEnter(credentials.username, credentials.password, selectedRoom, faceBox.checked, avatar);
  });

  usernameInput.focus();
  renderSavedAccounts();
  redraw();

  return {
    root,
    setStatus,
    setBusy: (busy) => { enterBtn.disabled = busy; loginBtn.disabled = busy; },
    showRoomScreen: showRooms,
    backgroundStart: () => background.start(),
    backgroundStop: () => background.stop()
  };
}

function bootstrap(): void {
  const renderer = new Renderer();
  const network = new NetworkClient();
  const inputController = new InputController(renderer.canvas);
  const audio = new AudioEngine();

  let started = false;
  let pendingAvatar: AvatarChoice | null = null;

  const hud = new GameHud({
    canvas: renderer.canvas,
    onDisconnect: () => {
      network.disconnect();
      hud.hide();
      mobile?.hide();
      chat.hide();
      if (document.pointerLockElement) document.exitPointerLock();
      overlay.root.style.display = 'flex';
      overlay.backgroundStart();
      overlay.setBusy(false);
      overlay.setStatus('Disconnected. Re-enter when ready.');
      overlay.showRoomScreen();
    }
  });

  const chat = new ChatBox({ canvas: renderer.canvas });
  const mobile = MobileControls.isTouch()
    ? new MobileControls({ onMenu: () => hud.openMenu(), onChat: () => chat.openBox() })
    : null;

  const overlay = buildLoginOverlay(async (username, password, roomCode, faceTracking, avatar) => {
    overlay.setBusy(true);
    overlay.setStatus('Entering the village…');
    pendingAvatar = avatar;
    try {
      await audio.init();
    } catch {
      overlay.setStatus('Microphone unavailable — voice disabled.');
    }
    if (faceTracking) {
      void import('./face/FaceTracker')
        .then(({ FaceTracker }) => new FaceTracker().init())
        .then(() => console.log('[face] webcam expression tracking active (local inference)'))
        .catch((err) => console.warn('[face] face tracking unavailable:', err));
    }
    network.connect(username, password, roomCode);
  });

  eventBus.on('SOCKET_CONNECTED', () => {
    overlay.root.style.display = 'none';
    overlay.backgroundStop();
    overlay.setBusy(false);
    if (pendingAvatar?.touched) {
      eventBus.emit('SEND_AVATAR_UPDATE', {
        hat: pendingAvatar.hat,
        bodyColorHex: pendingAvatar.bodyColorHex,
        eyes: pendingAvatar.eyes,
        mouth: pendingAvatar.mouth,
        hair: pendingAvatar.hair
      });
    }
    if (!started) {
      started = true;
      inputController.attach();
      renderer.start();
    }
    hud.show();
    mobile?.show();
  });

  eventBus.on('SOCKET_REJECTED', ({ reason }) => {
    overlay.root.style.display = 'flex';
    overlay.backgroundStart();
    overlay.setBusy(false);
    overlay.setStatus(reason);
    overlay.showRoomScreen();
  });

  eventBus.on('SOCKET_CLOSED', () => {
    hud.hide();
    mobile?.hide();
    chat.hide();
    overlay.root.style.display = 'flex';
    overlay.backgroundStart();
    overlay.setBusy(false);
    overlay.setStatus('Connection lost. Re-enter when ready.');
  });
}

bootstrap();
