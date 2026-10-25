export const SERVER_TPS = 20;
export const TICK_DT = 1.0 / SERVER_TPS;
export const WALK_SPEED = 6.0;
export const SPRINT_SPEED = 10.0;
export const JUMP_VELOCITY = 6.7;
export const GRAVITY = 18.0;
export const AIR_FRICTION = 0.8;
export const AIR_CONTROL = 3.0;
export const PLAYER_HALF_EXTENT = 0.35;
export const PLAYER_HEIGHT = 1.8;
export const ENTITY_BODY_RADIUS = 0.28;
export const WORLD_RADIUS = 48;

const SKIN = 0.001;
const EPS = 0.0005;

// Collision boxes per structureType in cell-local space [minX,minY,minZ,maxX,maxY,maxZ].
// Register tighter hulls here when OBJ models replace the primitive meshes.
export const STRUCTURE_COLLIDERS = new Map();
const DEFAULT_COLLIDER = [[0, 0, 0, 1, 1, 1]];

function collectAabbs(getStructureType, minX, minY, minZ, maxX, maxY, maxZ, out) {
  const gx0 = Math.floor(minX);
  const gx1 = Math.floor(maxX);
  const gy0 = Math.max(0, Math.floor(minY));
  const gy1 = Math.floor(maxY);
  const gz0 = Math.floor(minZ);
  const gz1 = Math.floor(maxZ);
  for (let gx = gx0; gx <= gx1; gx++) {
    for (let gy = gy0; gy <= gy1; gy++) {
      for (let gz = gz0; gz <= gz1; gz++) {
        const type = getStructureType(gx, gy, gz);
        if (!type) continue;
        const boxes = STRUCTURE_COLLIDERS.get(type) ?? DEFAULT_COLLIDER;
        for (const b of boxes) {
          const bx0 = gx + b[0];
          const by0 = gy + b[1];
          const bz0 = gz + b[2];
          const bx1 = gx + b[3];
          const by1 = gy + b[4];
          const bz1 = gz + b[5];
          if (bx1 > minX && bx0 < maxX && by1 > minY && by0 < maxY && bz1 > minZ && bz0 < maxZ) {
            out.push([bx0, by0, bz0, bx1, by1, bz1]);
          }
        }
      }
    }
  }
}

function hasSupport(pos, getStructureType) {
  if (pos.y <= EPS) return true;
  const H = PLAYER_HALF_EXTENT;
  const boxes = [];
  collectAabbs(
    getStructureType,
    pos.x - H + SKIN, pos.y - 0.002, pos.z - H + SKIN,
    pos.x + H - SKIN, pos.y + EPS, pos.z + H - SKIN,
    boxes
  );
  for (const b of boxes) {
    if (Math.abs(b[4] - pos.y) <= 0.002) return true;
  }
  return false;
}

export function stepSharedKinematics(pos, velIn, keyBitmask, yawMrad, getStructureType, obstacles = [], dt = TICK_DT) {
  const speed = (keyBitmask & 32) !== 0 ? SPRINT_SPEED : WALK_SPEED;
  const yawRad = yawMrad / 1000.0;
  const sinYaw = Math.sin(yawRad);
  const cosYaw = Math.cos(yawRad);

  let moveX = 0.0;
  let moveZ = 0.0;

  if ((keyBitmask & 1) !== 0) { moveX += sinYaw; moveZ -= cosYaw; }
  if ((keyBitmask & 2) !== 0) { moveX -= sinYaw; moveZ += cosYaw; }
  if ((keyBitmask & 4) !== 0) { moveX -= cosYaw; moveZ -= sinYaw; }
  if ((keyBitmask & 8) !== 0) { moveX += cosYaw; moveZ += sinYaw; }

  // sqrt(x*x+z*z) instead of hypot: exactly IEEE-rounded in both V8 and the JVM server
  const mag = Math.sqrt(moveX * moveX + moveZ * moveZ);
  let wishX = 0.0;
  let wishZ = 0.0;

  if (mag > 0.001) {
    wishX = (moveX / mag) * speed;
    wishZ = (moveZ / mag) * speed;
  }

  const grounded = velIn.y <= 0 && hasSupport(pos, getStructureType);
  let vx;
  let vz;
  let vy = velIn.y;

  if (grounded) {
    vx = wishX;
    vz = wishZ;
    if ((keyBitmask & 16) !== 0 && vy <= 0) {
      vy = JUMP_VELOCITY;
    }
  } else {
    // Airborne: momentum with drag and limited steering, clamped to ground speed so bhopping gains nothing
    vx = velIn.x * (1.0 - AIR_FRICTION * dt) + wishX * AIR_CONTROL * dt;
    vz = velIn.z * (1.0 - AIR_FRICTION * dt) + wishZ * AIR_CONTROL * dt;
    const hMag = Math.sqrt(vx * vx + vz * vz);
    if (hMag > speed) {
      vx = (vx / hMag) * speed;
      vz = (vz / hMag) * speed;
    }
  }

  vy -= GRAVITY * dt;

  // Quantize to integer millimeters on every step to match server sint32 math
  vx = Math.round(vx * 1000) / 1000;
  vz = Math.round(vz * 1000) / 1000;
  vy = Math.round(vy * 1000) / 1000;

  const H = PLAYER_HALF_EXTENT;
  const PH = PLAYER_HEIGHT;
  let x = pos.x;
  let y = pos.y;
  let z = pos.z;

  if (vx !== 0) {
    const target = x + vx * dt;
    let nx = target;
    let hit = false;
    const boxes = [];
    collectAabbs(
      getStructureType,
      Math.min(x, target) - H, y + SKIN, z - H + SKIN,
      Math.max(x, target) + H, y + PH - SKIN, z + H - SKIN,
      boxes
    );
    for (const b of boxes) {
      if (vx > 0 && x + H <= b[0] + SKIN && target + H > b[0]) {
        nx = Math.min(nx, b[0] - H - SKIN);
        hit = true;
      } else if (vx < 0 && x - H >= b[3] - SKIN && target - H < b[3]) {
        nx = Math.max(nx, b[3] + H + SKIN);
        hit = true;
      }
    }
    if (hit) vx = 0;
    x = nx;
  }

  if (vz !== 0) {
    const target = z + vz * dt;
    let nz = target;
    let hit = false;
    const boxes = [];
    collectAabbs(
      getStructureType,
      x - H + SKIN, y + SKIN, Math.min(z, target) - H,
      x + H - SKIN, y + PH - SKIN, Math.max(z, target) + H,
      boxes
    );
    for (const b of boxes) {
      if (vz > 0 && z + H <= b[2] + SKIN && target + H > b[2]) {
        nz = Math.min(nz, b[2] - H - SKIN);
        hit = true;
      } else if (vz < 0 && z - H >= b[5] - SKIN && target - H < b[5]) {
        nz = Math.max(nz, b[5] + H + SKIN);
        hit = true;
      }
    }
    if (hit) vz = 0;
    z = nz;
  }

  for (const o of obstacles) {
    if (Math.abs(y - o.y) > 1.7) continue;
    const odx = x - o.x;
    const odz = z - o.z;
    const minDist = o.r + H;
    const d2 = odx * odx + odz * odz;
    if (d2 >= minDist * minDist) continue;
    if (d2 < 1e-8) {
      x += minDist;
      continue;
    }
    const d = Math.sqrt(d2);
    const push = minDist - d;
    x += (odx / d) * push;
    z += (odz / d) * push;
  }

  const bound = WORLD_RADIUS - H;
  if (x > bound) { x = bound; if (vx > 0) vx = 0; }
  else if (x < -bound) { x = -bound; if (vx < 0) vx = 0; }
  if (z > bound) { z = bound; if (vz > 0) vz = 0; }
  else if (z < -bound) { z = -bound; if (vz < 0) vz = 0; }

  if (vy !== 0) {
    const target = y + vy * dt;
    let ny = target;
    if (vy < 0) {
      let landed = false;
      const boxes = [];
      collectAabbs(
        getStructureType,
        x - H + SKIN, target, z - H + SKIN,
        x + H - SKIN, y, z + H - SKIN,
        boxes
      );
      for (const b of boxes) {
        if (b[4] <= y + EPS && target < b[4]) {
          ny = Math.max(ny, b[4]);
          landed = true;
        }
      }
      if (ny <= 0) {
        ny = 0;
        landed = true;
      }
      if (landed) vy = 0;
    } else {
      let bumped = false;
      const boxes = [];
      collectAabbs(
        getStructureType,
        x - H + SKIN, y + PH, z - H + SKIN,
        x + H - SKIN, target + PH, z + H - SKIN,
        boxes
      );
      for (const b of boxes) {
        if (b[1] >= y + PH - EPS && target + PH > b[1]) {
          ny = Math.min(ny, b[1] - PH - SKIN);
          bumped = true;
        }
      }
      if (bumped) vy = 0;
    }
    y = ny;
  }

  x = Math.round(x * 1000) / 1000;
  y = Math.round(y * 1000) / 1000;
  z = Math.round(z * 1000) / 1000;
  if (y < 0) y = 0;

  return {
    nextPos: { x, y, z },
    velocity: { x: vx, y: vy, z: vz },
    grounded
  };
}
