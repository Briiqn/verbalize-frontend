import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const ACTION_NAMES = ['idle', 'chopping', 'hammering', 'farming', 'tinkering'];

const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
let seq = 0;
const npcNames = new Map();
const seenActions = new Map();

setTimeout(() => {
  console.error(`FAIL: no villager entered a work state in 90s (saw: ${[...seenActions.entries()]})`);
  process.exit(1);
}, 90000);

ws.on('open', () => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({
  sequenceNumber: ++seq, join: { username: 'workwatcher', password: 'test-pass-1' }
})).finish())));

ws.on('message', (data) => {
  const env = proto.ServerEnvelope.decode(unpack(data));
  if (env.welcome) {
    for (const e of env.welcome.initialEntities) {
      if (e.type === proto.EntityType.ENTITY_NPC) npcNames.set(e.netId, e.displayName);
    }
    console.log(`watching ${npcNames.size} villagers for work actions...`);
  }
  if (env.entityLifecycle) {
    for (const e of env.entityLifecycle.spawned) {
      if (e.type === proto.EntityType.ENTITY_NPC) npcNames.set(e.netId, e.displayName);
    }
  }
  if (env.entityDeltaTick) {
    for (const t of env.entityDeltaTick.dirtyEntities) {
      if (!npcNames.has(t.netId) || !t.actionState) continue;
      if (!seenActions.has(t.netId)) {
        seenActions.set(t.netId, t.actionState);
        console.log(`${npcNames.get(t.netId)} is ${ACTION_NAMES[t.actionState] ?? t.actionState} (actionState=${t.actionState})`);
      }
      if (seenActions.size >= 2) {
        console.log('VILLAGER WORK OK');
        process.exit(0);
      }
    }
  }
});

ws.on('error', (e) => { console.error('FAIL:', e.message); process.exit(1); });
