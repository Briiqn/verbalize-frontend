import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exit(1); };

const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
let seq = 0;
let myNetId = null;
const me = { x: 0, z: 0 };
let target = null;
let phase = 'walk';
let reactionText = '';

const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish()));
const sendMove = (keys, yawMrad, face) => send({ movementInput: { keyBitmask: keys, yawMrad, pitchMrad: 0, micEnergyByte: 0, faceState: face } });

setTimeout(() => fail(`timeout in phase ${phase}`), 45000);

ws.on('open', () => send({ join: { username: 'scowler', password: 'test-pass-1' } }));

ws.on('message', (data) => {
  const env = proto.ServerEnvelope.decode(unpack(data));
  if (env.welcome) {
    myNetId = env.welcome.assignedNetId;
    let best = Infinity;
    for (const e of env.welcome.initialEntities) {
      if (e.netId === myNetId) { me.x = e.xMm / 1000; me.z = e.zMm / 1000; }
      if (e.type === proto.EntityType.ENTITY_NPC) {
        const d = e.xMm * e.xMm + e.zMm * e.zMm;
        if (d < best) { best = d; target = { netId: e.netId, x: e.xMm / 1000, z: e.zMm / 1000, name: e.displayName }; }
      }
    }
    const timer = setInterval(() => {
      const dx = target.x - me.x;
      const dz = target.z - me.z;
      const yawToNpc = Math.round(Math.atan2(dx, -dz) * 1000);
      if (Math.hypot(dx, dz) > 3.0) {
        sendMove(1, yawToNpc, 255);
      } else if (phase === 'walk') {
        phase = 'scowl';
        console.log(`standing before ${target.name}, scowling at them (faceState 5)...`);
      } else {
        // stand still, face the NPC, hold an angry frown
        sendMove(0, yawToNpc, 5);
      }
    }, 50);
    return;
  }
  if (env.entityDeltaTick) {
    for (const t of env.entityDeltaTick.dirtyEntities) {
      if (t.netId === myNetId) { me.x = t.xMm / 1000; me.z = t.zMm / 1000; }
      if (target && t.netId === target.netId) { target.x = t.xMm / 1000; target.z = t.zMm / 1000; }
    }
  }
  if (env.npcStreamChunk && phase === 'scowl') {
    if (env.npcStreamChunk.textDelta) reactionText += env.npcStreamChunk.textDelta;
    if (env.npcStreamChunk.isComplete && reactionText.trim().length > 0) {
      console.log(`${target.name} reacts to the scowl: ${JSON.stringify(reactionText.trim())}`);
      console.log('EXPRESSION REACTION OK');
      process.exit(0);
    }
  }
});

ws.on('error', (e) => fail(e.message));
