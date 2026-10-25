import { generateWorldFeatures } from '/home/brian/Downloads/test/src/core/worldgen.js';

let fail = 0;
const typeCounts = new Map();
let totalBuildings = 0;
for (let seed = 1; seed <= 200; seed++) {
  const f = generateWorldFeatures(seed * 7919);
  const err = (msg) => { console.error(`seed ${seed}: ${msg}`); fail++; };

  if (f.buildings.length < 6) err(`only ${f.buildings.length} buildings`);
  totalBuildings += f.buildings.length;
  for (const b of f.buildings) {
    typeCounts.set(b.type, (typeCounts.get(b.type) ?? 0) + 1);
    if (f.staticCells.has(`${b.doorX},0,${b.doorZ}`) || f.staticCells.has(`${b.doorX2},0,${b.doorZ2}`)) err('door cell is a wall');
    if (f.staticCells.has(`${b.doorX},1,${b.doorZ}`)) err('door blocked at head height');
    if (!f.pathCells.has(`${b.frontX},${b.frontZ}`)) err(`front cell (${b.frontX},${b.frontZ}) not on a path`);
    for (const c of b.wallCells) {
      if (f.pathCells.has(`${c.x},${c.z}`)) err(`wall at (${c.x},${c.z}) overlaps a path`);
      if (b.height === 3 && !f.staticCells.has(`${c.x},2,${c.z}`)) err('two-story wall missing third layer');
    }
    for (const other of f.buildings) {
      if (other === b) continue;
      if (b.x0 < other.x0 + other.w && b.x0 + b.w > other.x0 && b.z0 < other.z0 + other.d && b.z0 + b.d > other.z0) {
        err('buildings overlap');
      }
    }
  }
  for (const t of f.trees) {
    if (f.pathCells.has(`${Math.floor(t.x)},${Math.floor(t.z)}`)) err('tree on path');
  }
  // BFS: every building front reachable from plaza over unblocked cells
  for (const b of f.buildings) {
    const seen = new Set(['0,4']);
    const queue = [[0, 4]];
    let found = false;
    while (queue.length && !found) {
      const [x, z] = queue.shift();
      if (x === b.frontX && z === b.frontZ) { found = true; break; }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        const k = `${nx},${nz}`;
        if (Math.abs(nx) > 46 || Math.abs(nz) > 46 || seen.has(k) || f.blockedCells.has(k)) continue;
        seen.add(k);
        queue.push([nx, nz]);
      }
    }
    if (!found) err(`building front (${b.frontX},${b.frontZ}) unreachable from plaza`);
  }
}
const counts = [...typeCounts.entries()].sort((a, b) => a[0] - b[0]).map(([t, n]) => `type${t}:${n}`).join(' ');
console.log(`type distribution across 200 seeds (${totalBuildings} buildings): ${counts}`);
console.log(fail === 0 ? 'VILLAGE VALIDATION OK (200 seeds)' : `${fail} FAILURES`);
process.exit(fail === 0 ? 0 : 1);
