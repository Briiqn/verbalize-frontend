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
let spawnZ = 0;
let gotWelcome = false;
let gotAck = false;
let gotWorldDelta = false;
let gotJump = false;
let gotFriction = false;
let jumpSent = false;
let jumpVz = 0;

setTimeout(() => fail(`timeout (welcome=${gotWelcome} ack=${gotAck} delta=${gotWorldDelta} jump=${gotJump} friction=${gotFriction})`), 15000);

const send = (fields) => ws.send(pack(proto.ClientEnvelope.encode(proto.ClientEnvelope.create({ sequenceNumber: ++seq, ...fields })).finish()));

ws.on('open', () => send({ join: { username: 'smoketest', password: 'test-pass-1' } }));

ws.on('message', (data) => {
  const env = proto.ServerEnvelope.decode(unpack(data));
  if (env.welcome) {
    gotWelcome = true;
    myNetId = env.welcome.assignedNetId;
    const me = env.welcome.initialEntities.find((e) => e.netId === myNetId);
    spawnZ = me.zMm;
    console.log(`welcome: netId=${myNetId} tick=${env.welcome.tickRateHz} entities=${env.welcome.initialEntities.length} seed=${env.welcome.worldSeed}`);
    send({ movementInput: { keyBitmask: 1, yawMrad: 0, pitchMrad: 0, micEnergyByte: 42 } });
    send({ worldInteract: { gridX: 3, gridY: 0, gridZ: -2, structureType: 1 } });
  }
  if (env.worldDelta && !gotWorldDelta) {
    gotWorldDelta = true;
    const d = env.worldDelta.deltas[0];
    console.log(`worldDelta: (${d.gridX},${d.gridY},${d.gridZ}) type=${d.structureType}`);
  }
  if (env.entityDeltaTick) {
    const ev = env.entityDeltaTick;
    const me = ev.dirtyEntities.find((e) => e.netId === myNetId);
    if (!gotAck && ev.ackInputSeq >= 2 && me) {
      gotAck = true;
      if (me.zMm >= spawnZ) fail(`expected -Z movement (spawn z=${spawnZ}, now ${me.zMm})`);
      console.log(`moved: dz=${me.zMm - spawnZ}mm (one 20TPS walk step = -300mm expected)`);
      jumpSent = true;
      send({ movementInput: { keyBitmask: 17, yawMrad: 0, pitchMrad: 0, micEnergyByte: 0 } });
    } else if (jumpSent && !gotJump && me && me.yMm > 0) {
      gotJump = true;
      jumpVz = me.vzMm;
      console.log(`jump(W held): y=${me.yMm}mm vy=${me.vyMm}mm/s vz=${me.vzMm}mm/s (expect y=290, vy=5800, vz=-6000)`);
      if (me.yMm !== 290 || me.vyMm !== 5800) fail('jump values diverged from deterministic expectation');
      send({ movementInput: { keyBitmask: 0, yawMrad: 0, pitchMrad: 0, micEnergyByte: 0 } });
    } else if (gotJump && !gotFriction && me && me.yMm > 0 && me.vzMm !== jumpVz && me.vzMm !== 0) {
      if (Math.abs(me.vzMm) >= Math.abs(jumpVz)) fail(`airborne vz did not decay (${jumpVz} -> ${me.vzMm})`);
      gotFriction = true;
      console.log(`air friction: coasting vz ${jumpVz} -> ${me.vzMm}mm/s with no input (expect -5760)`);
    }
  }
  if (gotWelcome && gotAck && gotWorldDelta && gotJump && gotFriction) {
    console.log('SMOKE OK');
    process.exit(0);
  }
});

ws.on('error', (e) => fail(e.message));
