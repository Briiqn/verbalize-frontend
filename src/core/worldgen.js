import { WORLD_RADIUS } from './simulation.js';

export const TREE_TRUNK_RADIUS = 0.3;
export const PLAZA_RADIUS = 5.5;
const TREE_COUNT = 36;
const TREE_MARGIN = 3;
const TREE_MIN_SPACING_SQ = 25;
const MACHINE_COUNT = 16;
// 8 verts/tuft against 16-bit indices caps this at 8192
const GRASS_COUNT = 8000;
const MAX_BUILDINGS = 9;
const AVENUE_END = 42;
const WALL_CELL_TYPE = 9;

function splitmix32(a) {
  return function next() {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

export function cellHash01(x, z) {
  let h = Math.imul(x | 0, 0x85ebca6b) ^ Math.imul(z | 0, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 15), 0x735a2d97);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Village layout is rule-based: four cardinal avenues from the plaza, buildings in
// slots along them with doors opening straight onto the road, so nothing can block entry.
export function generateWorldFeatures(seed32) {
  const rand = splitmix32(seed32 | 0);

  const pathCells = new Set();
  const pathList = [];
  const addPath = (x, z) => {
    const k = `${x},${z}`;
    if (!pathCells.has(k)) {
      pathCells.add(k);
      pathList.push({ x, z });
    }
  };

  const pr = Math.ceil(PLAZA_RADIUS);
  for (let x = -pr - 1; x <= pr; x++) {
    for (let z = -pr - 1; z <= pr; z++) {
      const cx = x + 0.5;
      const cz = z + 0.5;
      if (cx * cx + cz * cz <= PLAZA_RADIUS * PLAZA_RADIUS) addPath(x, z);
    }
  }

  const towerCells = [];
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) towerCells.push({ x, z });
  }

  const dirs = [
    { dx: 1, dz: 0 },
    { dx: -1, dz: 0 },
    { dx: 0, dz: 1 },
    { dx: 0, dz: -1 }
  ];
  for (const dir of dirs) {
    for (let t = 3; t <= AVENUE_END; t++) {
      for (let off = -1; off <= 1; off++) {
        addPath(dir.dx !== 0 ? dir.dx * t : off, dir.dz !== 0 ? dir.dz * t : off);
      }
    }
  }

  const buildingReserve = new Set();
  const reserveFootprint = (x0, z0, w, d) => {
    for (let x = x0 - 1; x <= x0 + w; x++) {
      for (let z = z0 - 1; z <= z0 + d; z++) buildingReserve.add(`${x},${z}`);
    }
  };
  const footprintConflicts = (x0, z0, w, d) => {
    for (let x = x0 - 1; x <= x0 + w; x++) {
      for (let z = z0 - 1; z <= z0 + d; z++) {
        if (buildingReserve.has(`${x},${z}`)) return true;
      }
    }
    return false;
  };

  const buildings = [];
  const slotBases = [10, 17, 24, 31];
  let slotIndex = 0;

  outer: for (let round = 0; round < 2; round++) {
    for (const dir of dirs) {
    for (const side of [1, -1]) {
      if (buildings.length >= MAX_BUILDINGS) break outer;
      if (round === 1 && rand() < 0.35) {
        slotIndex++;
        continue;
      }
      const along0 = slotBases[slotIndex++ % slotBases.length] + Math.floor(rand() * 3);
      const w = 5 + Math.floor(rand() * 4); // extent along the avenue
      const depth = 5 + Math.floor(rand() * 4);
      if (along0 + w >= WORLD_RADIUS - 4) continue;

      let x0;
      let z0;
      let bw;
      let bd;
      let doorX;
      let doorZ;
      let doorX2;
      let doorZ2;
      let frontX;
      let frontZ;
      if (dir.dx !== 0) {
        x0 = dir.dx > 0 ? along0 : -(along0 + w);
        z0 = side > 0 ? 2 : -(1 + depth);
        bw = w;
        bd = depth;
        doorZ = side > 0 ? z0 : z0 + depth - 1;
        doorX = x0 + Math.floor(w / 2) - 1;
        doorX2 = doorX + 1;
        doorZ2 = doorZ;
        frontX = doorX;
        frontZ = side > 0 ? doorZ - 1 : doorZ + 1;
      } else {
        z0 = dir.dz > 0 ? along0 : -(along0 + w);
        x0 = side > 0 ? 2 : -(1 + depth);
        bw = depth;
        bd = w;
        doorX = side > 0 ? x0 : x0 + depth - 1;
        doorZ = z0 + Math.floor(w / 2) - 1;
        doorZ2 = doorZ + 1;
        doorX2 = doorX;
        frontZ = doorZ;
        frontX = side > 0 ? doorX - 1 : doorX + 1;
      }
      if (footprintConflicts(x0, z0, bw, bd)) continue;

      const isDoor = (x, z) => (x === doorX && z === doorZ) || (x === doorX2 && z === doorZ2);
      const wallCells = [];
      for (let x = x0; x < x0 + bw; x++) {
        for (let z = z0; z < z0 + bd; z++) {
          const edge = x === x0 || x === x0 + bw - 1 || z === z0 || z === z0 + bd - 1;
          if (!edge || isDoor(x, z)) continue;
          wallCells.push({ x, z });
        }
      }

      // Furnishings hug the wall opposite the door so the entrance stays clear
      const props = [];
      const propCount = 1 + Math.floor(rand() * 2);
      for (let p = 0; p < propCount; p++) {
        let px;
        let pz;
        if (doorZ === z0 || doorZ === z0 + bd - 1) {
          pz = doorZ === z0 ? z0 + bd - 1.5 : z0 + 1.5;
          px = x0 + 1.6 + rand() * Math.max(0.5, bw - 3.2);
        } else {
          px = doorX === x0 ? x0 + bw - 1.5 : x0 + 1.5;
          pz = z0 + 1.6 + rand() * Math.max(0.5, bd - 3.2);
        }
        props.push({ x: px, z: pz, kind: Math.floor(rand() * 2) });
      }

      reserveFootprint(x0, z0, bw, bd);
      // types: 0 cottage, 1 forge/workshop, 2 warehouse, 3 two-story house, 4 shop
      const type = buildings.length === 0 ? 1 : buildings.length === 1 ? 2 : Math.floor(rand() * 5);
      const height = type === 3 ? 3 : 2;
      buildings.push({
        type,
        height,
        tint: rand(),
        x0, z0,
        w: bw, d: bd,
        doorX, doorZ,
        doorX2, doorZ2,
        frontX, frontZ,
        wallCells,
        props
      });
    }
    }
  }

  const lamps = [];
  for (const dir of dirs) {
    for (const t of [8, 15, 22, 28]) {
      if (lamps.length >= 12) break;
      const side = t % 2 === 0 ? 1.8 : -1.8;
      const lx = dir.dx !== 0 ? dir.dx * t + 0.5 : side;
      const lz = dir.dz !== 0 ? dir.dz * t + 0.5 : side;
      if (buildingReserve.has(`${Math.floor(lx)},${Math.floor(lz)}`)) continue;
      if (buildings.some((b) => Math.abs(lx - (b.frontX + 0.5)) < 2.5 && Math.abs(lz - (b.frontZ + 0.5)) < 2.5)) continue;
      lamps.push({ x: lx, z: lz });
    }
  }

  const staticCells = new Map();
  const blockedCells = new Set();
  const addWall = (x, z, height) => {
    for (let y = 0; y < height; y++) staticCells.set(`${x},${y},${z}`, WALL_CELL_TYPE);
    blockedCells.add(`${x},${z}`);
  };
  for (const b of buildings) {
    for (const c of b.wallCells) addWall(c.x, c.z, b.height);
    if (b.height === 3) {
      // lintel over the 2-cell door opening (collision only above head height; A* stays open)
      staticCells.set(`${b.doorX},2,${b.doorZ}`, WALL_CELL_TYPE);
      staticCells.set(`${b.doorX2},2,${b.doorZ2}`, WALL_CELL_TYPE);
    }
  }
  for (const c of towerCells) addWall(c.x, c.z, 3);

  // Trees keep a full cell of clearance from every road and building
  const nearVillage = (gx, gz) => {
    for (let x = gx - 1; x <= gx + 1; x++) {
      for (let z = gz - 1; z <= gz + 1; z++) {
        if (pathCells.has(`${x},${z}`) || buildingReserve.has(`${x},${z}`)) return true;
      }
    }
    return false;
  };
  const trees = [];
  const treeCells = new Set();
  for (let attempt = 0; attempt < 600 && trees.length < TREE_COUNT; attempt++) {
    const x = Math.round((rand() * 2 - 1) * (WORLD_RADIUS - TREE_MARGIN) * 2) / 2;
    const z = Math.round((rand() * 2 - 1) * (WORLD_RADIUS - TREE_MARGIN) * 2) / 2;
    if (x * x + z * z < (PLAZA_RADIUS + 3) * (PLAZA_RADIUS + 3)) continue;
    if (nearVillage(Math.floor(x), Math.floor(z))) continue;
    let spaced = true;
    for (const t of trees) {
      const dx = t.x - x;
      const dz = t.z - z;
      if (dx * dx + dz * dz < TREE_MIN_SPACING_SQ) {
        spaced = false;
        break;
      }
    }
    if (!spaced) continue;
    trees.push({
      x, z,
      trunkHeight: 1.8 + rand() * 1.5,
      foliageRadius: 0.9 + rand() * 0.7,
      tint: rand()
    });
    treeCells.add(`${Math.floor(x)},${Math.floor(z)}`);
    blockedCells.add(`${Math.floor(x)},${Math.floor(z)}`);
  }

  // Decorative steampunk machinery scattered through the fields. Client-only and
  // non-colliding (kept out of `obstacles`) so it never diverges from the server sim.
  const machines = [];
  for (let attempt = 0; attempt < 400 && machines.length < MACHINE_COUNT; attempt++) {
    const x = Math.round((rand() * 2 - 1) * (WORLD_RADIUS - 4) * 2) / 2;
    const z = Math.round((rand() * 2 - 1) * (WORLD_RADIUS - 4) * 2) / 2;
    if (x * x + z * z < (PLAZA_RADIUS + 2) * (PLAZA_RADIUS + 2)) continue;
    if (nearVillage(Math.floor(x), Math.floor(z))) continue;
    let spaced = true;
    for (const m of machines) {
      const dx = m.x - x, dz = m.z - z;
      if (dx * dx + dz * dz < 20) { spaced = false; break; }
    }
    if (spaced) for (const t of trees) {
      const dx = t.x - x, dz = t.z - z;
      if (dx * dx + dz * dz < 6) { spaced = false; break; }
    }
    if (!spaced) continue;
    machines.push({ x, z, rot: rand() * Math.PI * 2, variant: rand() < 0.5 ? 0 : 1 });
  }

  const obstacles = [
    ...trees.map((t) => ({ x: t.x, y: 0, z: t.z, r: TREE_TRUNK_RADIUS })),
    ...lamps.map((l) => ({ x: l.x, y: 0, z: l.z, r: 0.14 }))
  ];
  for (const b of buildings) {
    for (const p of b.props) obstacles.push({ x: p.x, y: 0, z: p.z, r: 0.35 });
  }

  const spawnPoints = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    spawnPoints.push({ x: Math.sin(a) * (PLAZA_RADIUS - 1.4), z: -Math.cos(a) * (PLAZA_RADIUS - 1.4) });
  }
  const npcSpots = buildings.slice(0, 3).map((b) => ({ x: b.frontX + 0.5, z: b.frontZ + 0.5 }));
  while (npcSpots.length < 3) npcSpots.push({ x: 3 + npcSpots.length, z: 3 });

  return {
    trees, treeCells, obstacles, machines,
    staticCells, blockedCells,
    pathCells, pathList,
    buildings, lamps, towerCells,
    spawnPoints, npcSpots
  };
}

export function generateGrass(seed32, features) {
  const rand = splitmix32((seed32 ^ 0x51ab3e7d) | 0);
  const tufts = [];
  let guard = 0;
  while (tufts.length < GRASS_COUNT && guard++ < GRASS_COUNT * 3) {
    const x = (rand() * 2 - 1) * (WORLD_RADIUS - 1.5);
    const z = (rand() * 2 - 1) * (WORLD_RADIUS - 1.5);
    if (features.pathCells.has(`${Math.floor(x)},${Math.floor(z)}`)) continue;
    if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
    let blocked = false;
    for (const b of features.buildings) {
      if (x >= b.x0 - 0.3 && x <= b.x0 + b.w + 0.3 && z >= b.z0 - 0.3 && z <= b.z0 + b.d + 0.3) {
        blocked = true;
        break;
      }
    }
    if (blocked) continue;
    tufts.push({
      x, z,
      height: 0.18 + rand() * 0.22,
      angle: rand() * Math.PI,
      colorVar: rand()
    });
  }
  return tufts;
}
