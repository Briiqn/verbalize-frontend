import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exit(1); };

setTimeout(() => fail('timeout waiting for face state relay'), 15000);

function makeClient(name, onWelcome, onDelta) {
  const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
  const state = { ws, seq: 0, netId: null };
  const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++state.seq, ...fields })).finish()));
  state.send = send;
  ws.on('open', () => send({ join: { username: name, password: 'test-pass-1' } }));
  ws.on('message', (data) => {
    const env = proto.ServerEnvelope.decode(unpack(data));
    if (env.welcome) {
      state.netId = env.welcome.assignedNetId;
      onWelcome(state);
    }
    if (env.entityDeltaTick) onDelta(state, env.entityDeltaTick);
  });
  ws.on('error', (e) => fail(e.message));
  return state;
}

let smiler = null;
let sawSmile = false;
let sawProcedural = false;

smiler = makeClient('smiler', (s) => {
  // walk + smile (face_state 4) while looking up (pitch 700 mrad)
  const timer = setInterval(() => {
    s.send({ movementInput: { keyBitmask: 1, yawMrad: 0, pitchMrad: 700, micEnergyByte: 0, faceState: 4, headRollMrad: -300 } });
  }, 50);
  setTimeout(() => clearInterval(timer), 8000);
}, () => {});

setTimeout(() => {
  makeClient('watcher', () => {}, (s, delta) => {
    for (const t of delta.dirtyEntities) {
      if (smiler.netId !== null && t.netId === smiler.netId) {
        if (t.faceState === 4 && t.pitchMrad === 700 && t.headRollMrad === -300 && !sawSmile) {
          sawSmile = true;
          console.log(`watcher sees relayed face: faceState=${t.faceState} (smile), pitch=${t.pitchMrad}mrad, headRoll=${t.headRollMrad}mrad`);
        }
      }
      if (t.netId <= 6 && t.faceState === 255 && !sawProcedural) {
        sawProcedural = true;
        console.log(`NPC transform carries faceState=255 (procedural expressions preserved)`);
      }
    }
    if (sawSmile && sawProcedural) {
      console.log('FACE RELAY OK');
      process.exit(0);
    }
  });
}, 800);
