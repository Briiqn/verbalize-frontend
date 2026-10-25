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
let targetName = '';
let phase = 'walk';
let replyText = '';
let audioBytes = 0;

const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish()));
const sendMove = (keys, yawMrad, mic) => send({ movementInput: { keyBitmask: keys, yawMrad, pitchMrad: 0, micEnergyByte: mic } });

setTimeout(() => fail(`timeout in phase ${phase} (reply so far: "${replyText}")`), 60000);

ws.on('open', () => send({ join: { username: 'voicetester', password: 'test-pass-1' } }));

ws.on('message', (data) => {
  const env = proto.ServerEnvelope.decode(unpack(data));
  if (env.welcome) {
    myNetId = env.welcome.assignedNetId;
    let best = Infinity;
    for (const e of env.welcome.initialEntities) {
      if (e.netId === myNetId) { me.x = e.xMm / 1000; me.z = e.zMm / 1000; }
      if (e.type === proto.EntityType.ENTITY_NPC) {
        const d = e.xMm * e.xMm + e.zMm * e.zMm;
        if (d < best) { best = d; target = { netId: e.netId, x: e.xMm / 1000, z: e.zMm / 1000 }; targetName = e.displayName; }
      }
    }
    if (!target) fail('no NPC in welcome');
    console.log(`walking to NPC #${target.netId} "${targetName}" at (${target.x.toFixed(1)}, ${target.z.toFixed(1)})`);
    const walkTimer = setInterval(() => {
      const dx = target.x - me.x;
      const dz = target.z - me.z;
      if (Math.hypot(dx, dz) > 3.5) {
        sendMove(1, Math.round(Math.atan2(dx, -dz) * 1000), 12 + (seq % 8));
      } else {
        clearInterval(walkTimer);
        phase = 'reply';
        sendMove(0, 0, 0);
        send({
          npcAudioInteract: {
            targetNetId: target.netId,
            audioChunk: new Uint8Array(0),
            transcriptHint: 'hello there, tell me what you do in this village',
            isFinalChunk: true
          }
        });
        console.log('sent voice interact with transcript');
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
  if (env.npcStreamChunk && phase === 'reply') {
    const c = env.npcStreamChunk;
    if (c.textDelta) replyText += c.textDelta;
    if (c.audioChunk && c.audioChunk.length > 0) audioBytes += c.audioChunk.length;
    if (c.isComplete) {
      console.log(`REPLY (${targetName}): ${JSON.stringify(replyText)}`);
      console.log(`TTS audio relayed: ${audioBytes} bytes`);
      if (replyText.trim().length < 5) fail('reply too short / empty');
      console.log('NPC VOICE CHAT OK');
      process.exit(0);
    }
  }
});

ws.on('error', (e) => fail(e.message));
