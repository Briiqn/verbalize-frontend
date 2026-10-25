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
let replyText = '';
let exchange = 1;

const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish()));
const sendMove = (keys, yawMrad, mic) => send({ movementInput: { keyBitmask: keys, yawMrad, pitchMrad: 0, micEnergyByte: mic } });
const interact = (text) => send({ npcAudioInteract: { targetNetId: target.netId, audioChunk: new Uint8Array(0), transcriptHint: text, isFinalChunk: true } });

setTimeout(() => fail(`timeout in phase ${phase} exchange ${exchange}`), 90000);

ws.on('open', () => send({ join: { username: 'memtester', password: 'test-pass-1' } }));

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
    const walkTimer = setInterval(() => {
      const dx = target.x - me.x;
      const dz = target.z - me.z;
      if (Math.hypot(dx, dz) > 3.5) sendMove(1, Math.round(Math.atan2(dx, -dz) * 1000), 10);
      else {
        clearInterval(walkTimer);
        sendMove(0, 0, 0);
        phase = 'reply';
        console.log(`exchange 1 -> ${target.name}: telling them a secret word`);
        interact('please remember this: my favorite machine is the marmalade engine');
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
    if (c.isComplete) {
      console.log(`  reply ${exchange}: ${JSON.stringify(replyText.trim())}`);
      if (exchange === 1) {
        exchange = 2;
        replyText = '';
        setTimeout(() => {
          console.log(`exchange 2 -> ${target.name}: asking them to recall it`);
          interact('what did I just tell you my favorite machine was?');
        }, 1500);
      } else {
        const remembered = /marmalade/i.test(replyText);
        console.log(remembered ? 'NPC MEMORY OK (recalled the marmalade engine)' : 'MEMORY WEAK: reply did not mention it');
        process.exit(remembered ? 0 : 1);
      }
    }
  }
});

ws.on('error', (e) => fail(e.message));
