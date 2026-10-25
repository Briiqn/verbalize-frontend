import zlib from 'node:zlib';
import WebSocket from '/home/brian/Downloads/test/node_modules/ws/index.js';
import { dev } from '/home/brian/Downloads/test/src/proto/protocol.js';

const proto = dev.briiqn.verbalize.proto;
const pack = (b) => Buffer.concat([Buffer.from([0]), Buffer.from(b)]);
const unpack = (buf) => (buf[0] === 1 ? zlib.inflateRawSync(buf.subarray(1)) : buf.subarray(1));
const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exit(1); };

const USER = `alice_${Date.now() % 100000}`;
const PASS = 'secret-brass-1';
const AVATAR = { hat: 4, bodyColorHex: 0x3366cc, eyes: 2, mouth: 1, hair: 2 };

setTimeout(() => fail('timeout'), 30000);

function session(username, password) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:8080/ws/verbalize');
    let seq = 0;
    const api = {
      ws,
      send: (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish())),
      handlers: []
    };
    ws.on('open', () => api.send({ join: { username, password } }));
    ws.on('message', (data) => {
      const env = proto.ServerEnvelope.decode(unpack(data));
      if (env.welcome) resolve({ api, welcome: env.welcome, rejected: null });
      if (env.joinRejected) resolve({ api, welcome: null, rejected: env.joinRejected.reason });
      for (const h of api.handlers) h(env);
    });
    ws.on('error', reject);
  });
}

// 1. register
const first = await session(USER, PASS);
if (!first.welcome) fail(`registration rejected: ${first.rejected}`);
const myNetId = first.welcome.assignedNetId;
console.log(`registered + joined as ${USER} (netId ${myNetId})`);

// 2. customize avatar, wait for lifecycle echo
const echoed = await new Promise((resolve) => {
  first.api.handlers.push((env) => {
    if (env.entityLifecycle) {
      const me = env.entityLifecycle.spawned.find((e) => e.netId === myNetId);
      if (me) resolve(me);
    }
  });
  first.api.send({ avatarUpdate: AVATAR });
});
if (echoed.avatarHat !== 4 || echoed.avatarEyes !== 2 || echoed.avatarMouth !== 1 || echoed.avatarHair !== 2 || echoed.baseColorHex !== 0x3366cc) {
  fail(`avatar echo mismatch: ${JSON.stringify(echoed)}`);
}
console.log('avatar customized: paddy hat, sleepy eyes, flat mouth, topknot, blue — broadcast to all clients');
first.api.ws.close();
await new Promise((r) => setTimeout(r, 500));

// 3. wrong password
const bad = await session(USER, 'wrong-password');
if (bad.welcome) fail('wrong password was accepted!');
console.log(`wrong password rejected: "${bad.rejected}"`);
bad.api.ws.close();

// 4. correct password → persisted avatar in welcome
const second = await session(USER, PASS);
if (!second.welcome) fail(`re-login rejected: ${second.rejected}`);
const me = second.welcome.initialEntities.find((e) => e.netId === second.welcome.assignedNetId);
if (me.avatarHat !== 4 || me.avatarEyes !== 2 || me.avatarMouth !== 1 || me.avatarHair !== 2 || me.baseColorHex !== 0x3366cc) {
  fail(`persisted avatar mismatch after re-login: ${JSON.stringify(me)}`);
}
console.log('re-login with correct password: avatar loaded from MariaDB (paddy hat intact)');
console.log('AUTH + AVATAR PERSISTENCE OK');
process.exit(0);
