import { generateWorldFeatures } from '/home/brian/Downloads/test/src/core/worldgen.js';
import { stepSharedKinematics, ENTITY_BODY_RADIUS } from '/home/brian/Downloads/test/src/core/simulation.js';

const seed = Number(process.argv[2] ?? 123456789) | 0;
const f = generateWorldFeatures(seed);

const cells = [...f.staticCells.entries()].map(([k, v]) => `${k}=${v}`).sort();
console.log(`staticCells:${cells.length}:${cells.join(';')}`);
console.log(`trees:${f.trees.length}:` + f.trees.map((t) => `${t.x},${t.z},${t.trunkHeight},${t.foliageRadius},${t.tint}`).join(';'));
console.log(`buildings:${f.buildings.length}:` + f.buildings.map((b) => `${b.type},${b.height},${b.x0},${b.z0},${b.w},${b.d},${b.doorX},${b.doorZ},${b.frontX},${b.frontZ}`).join(';'));
console.log('lamps:' + f.lamps.map((l) => `${l.x},${l.z}`).join(';'));
console.log(`obstacles:${f.obstacles.length}:` + f.obstacles.map((o) => `${o.x},${o.z},${o.r}`).join(';'));

const gst = (gx, gy, gz) => f.staticCells.get(`${gx},${gy},${gz}`) ?? 0;
const obstacles = [{ x: 3, y: 0, z: 0.5, r: ENTITY_BODY_RADIUS }];
let pos = { x: 0.5, y: 0, z: 0.5 };
let vel = { x: 0, y: 0, z: 0 };
let samples = '';
for (let i = 0; i < 200; i++) {
  const key = i < 40 ? 1 : i < 80 ? (8 | 16) : i < 120 ? (2 | 32) : 0;
  const yaw = i < 40 ? i * 37 : i < 80 ? 500 : i < 120 ? -1234 : 0;
  const r = stepSharedKinematics(pos, vel, key, yaw, gst, obstacles);
  pos = r.nextPos;
  vel = r.velocity;
  if (i % 20 === 19) samples += `${pos.x},${pos.y},${pos.z},${vel.x},${vel.y},${vel.z};`;
}
console.log(`trajectory:${samples}`);
