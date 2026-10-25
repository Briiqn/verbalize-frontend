import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exit(1); };

const BASE = 'http://localhost:8080';
const USER = `roomer_${Date.now() % 100000}`;
const PASS = 'room-pass-1';
const auth = `Basic ${Buffer.from(`${USER}:${PASS}`).toString('base64')}`;

setTimeout(() => fail('timeout'), 30000);

function join(username, roomCode) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
    let seq = 0;
    ws.on('open', () => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({
      sequenceNumber: ++seq,
      join: { username, password: PASS, roomCode }
    })).finish())));
    ws.on('message', (data) => {
      const env = proto.ServerEnvelope.decode(unpack(data));
      if (env.welcome) resolve({ ws, welcome: env.welcome, rejected: null });
      if (env.joinRejected) resolve({ ws, welcome: null, rejected: env.joinRejected.reason });
    });
    ws.on('error', reject);
  });
}

// 0. unauthenticated creation must fail
const noAuth = await fetch(`${BASE}/api/rooms`, { method: 'POST', body: '{}' });
if (noAuth.status !== 401) fail(`expected 401 without auth, got ${noAuth.status}`);
console.log('unauthenticated room creation rejected (401)');

// 1. register the account via a game join, then create rooms over REST
const reg = await join(USER, '');
if (!reg.welcome) fail(`registration join failed: ${reg.rejected}`);
const lobbySeed = reg.welcome.worldSeed;
reg.ws.close();
await new Promise((r) => setTimeout(r, 400));

const pub = await (await fetch(`${BASE}/api/rooms`, {
  method: 'POST',
  headers: { Authorization: auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Brass Hangout', private: false })
})).json();
const priv = await (await fetch(`${BASE}/api/rooms`, {
  method: 'POST',
  headers: { Authorization: auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Secret Workshop', private: true })
})).json();
if (!pub.code || !priv.code) fail(`creation failed: ${JSON.stringify({ pub, priv })}`);
console.log(`created public ${pub.code} "Brass Hangout" and private ${priv.code} "Secret Workshop"`);

// 2. listing shows public + lobby but not private
const list = await (await fetch(`${BASE}/api/rooms`)).json();
const codes = list.map((r) => r.code);
if (!codes.includes('LOBBY') || !codes.includes(pub.code)) fail(`public list missing rooms: ${codes}`);
if (codes.includes(priv.code)) fail('private room leaked into public listing!');
console.log(`public listing: ${codes.join(', ')} (private room hidden)`);

// 3. join private room by code; separate world seed; isolation from lobby
const a = await join(`${USER}_a`, priv.code);
if (!a.welcome) fail(`join private room failed: ${a.rejected}`);
if (String(a.welcome.worldSeed) === String(lobbySeed)) fail('room shares the lobby world seed');
const b = await join(`${USER}_b`, priv.code);
if (!b.welcome) fail(`second join failed: ${b.rejected}`);
const bSeesA = b.welcome.initialEntities.some((e) => e.displayName === `${USER}_a`);
if (!bSeesA) fail('roommate not visible inside the room');
const c = await join(`${USER}_c`, '');
const cSeesA = c.welcome.initialEntities.some((e) => e.displayName === `${USER}_a`);
if (cSeesA) fail('lobby player can see private-room player — isolation broken!');
console.log(`room ${priv.code}: own world seed, roommates see each other, invisible from the lobby`);

// 4. unknown room code rejected
const bogus = await join(`${USER}_d`, 'ZZZZZZ');
if (bogus.welcome) fail('joined a nonexistent room?!');
console.log(`unknown room rejected: "${bogus.rejected}"`);

console.log('ROOM SYSTEM OK');
process.exit(0);
