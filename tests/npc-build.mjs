import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exit(1); };

const BUILDER_NET_ID = 5; // roster order: mayor, blacksmith, lumberjack, farmer, BUILDER, navigator

const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
let seq = 0;
let myNetId = null;
const me = { x: 0, z: 0 };
let target = null;
let phase = 'walk';
let replyText = '';
let blocksPlaced = 0;

const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish()));
const sendMove = (keys, yawMrad, mic) => send({ movementInput: { keyBitmask: keys, yawMrad, pitchMrad: 0, micEnergyByte: mic } });

setTimeout(() => fail(`timeout in phase ${phase} (reply="${replyText}" blocks=${blocksPlaced})`), 120000);

ws.on('open', () => send({ join: { username: 'housefan', password: 'test-pass-1' } }));

ws.on('message', (data) => {
  const env = proto.ServerEnvelope.decode(unpack(data));
  if (env.welcome) {
    myNetId = env.welcome.assignedNetId;
    for (const e of env.welcome.initialEntities) {
      if (e.netId === myNetId) { me.x = e.xMm / 1000; me.z = e.zMm / 1000; }
      if (e.netId === BUILDER_NET_ID) {
        target = { netId: e.netId, x: e.xMm / 1000, z: e.zMm / 1000, name: e.displayName };
      }
    }
    if (!target) fail('builder NPC not found');
    console.log(`walking to builder #${target.netId} "${target.name}"`);
    const walkTimer = setInterval(() => {
      const dx = target.x - me.x;
      const dz = target.z - me.z;
      if (Math.hypot(dx, dz) > 3.5) sendMove(1, Math.round(Math.atan2(dx, -dz) * 1000), 10);
      else {
        clearInterval(walkTimer);
        sendMove(0, 0, 0);
        phase = 'build';
        console.log('asking the builder for a house...');
        send({
          npcAudioInteract: {
            targetNetId: target.netId,
            audioChunk: new Uint8Array(0),
            transcriptHint: 'please build me a cozy little house right here',
            isFinalChunk: true
          }
        });
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
  if (env.npcStreamChunk && env.npcStreamChunk.textDelta) {
    replyText += env.npcStreamChunk.textDelta;
    if (env.npcStreamChunk.isComplete || replyText.length < 200) {
      // keep accumulating
    }
  }
  if (env.npcStreamChunk && env.npcStreamChunk.isComplete && phase === 'build') {
    console.log(`builder says: ${JSON.stringify(replyText.trim())}`);
  }
  if (env.worldDelta && phase === 'build') {
    blocksPlaced += env.worldDelta.deltas.length;
    if (blocksPlaced === 1) console.log('first block placed — house is rising!');
    if (blocksPlaced >= 30) {
      console.log(`HOUSE BUILD OK (${blocksPlaced}+ blocks placed in realtime, reply: ${JSON.stringify(replyText.trim().slice(0, 100))})`);
      process.exit(0);
    }
  }
});

ws.on('error', (e) => fail(e.message));
