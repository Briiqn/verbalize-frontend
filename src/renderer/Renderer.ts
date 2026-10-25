import { clientState } from '../core/store';
import {
  AUDIO_RING_MIN_ENERGY,
  CAMERA_EYE_HEIGHT,
  ERROR_OFFSET_DECAY_RATE,
  SNAPSHOT_INTERVAL_MS,
  INTERP_DELAY_MS,
  INTERP_EXTRAP_MAX_MS
} from '../core/constants';
import * as Mat4 from './Mat4';
import {
  createFaceQuad, createGroundQuad, createMeshFromArrays, createMeshFromArrays32, createUnitCone, createUnitCube,
  createUnitCylinder, createUnitQuadXZ, createUnitSphere, Mesh
} from './Primitives';

interface TreeFeature {
  x: number;
  z: number;
  trunkHeight: number;
  foliageRadius: number;
  tint: number;
}
import {
  FACE_FS, FACE_VS,
  GRASS_FS, GRASS_VS,
  GROUND_GRID_FS, GROUND_GRID_VS,
  OUTLINE_FS, OUTLINE_VS,
  RING_FS, RING_VS,
  SKY_FS, SKY_VS,
  SMOKE_FS, SMOKE_VS,
  SOLID_FS, SOLID_VS,
  createProgram, ShaderProgram
} from './Shaders';
import { WORLD_RADIUS } from '../core/simulation.js';
import { generateWorldFeatures, generateGrass, cellHash01 } from '../core/worldgen.js';
import { parseObj } from './ObjLoader';
import { SmokeSystem, SmokeEmitter } from './Smoke';

type WorldFeatures = ReturnType<typeof generateWorldFeatures>;
import { DialogueOverlay } from './DialogueOverlay';
import {
  StickmanRig, StickStyle, buildFaceAtlas, partShadeGroup,
  PART_COUNT, HEAD_INDEX, FOREARM_R_INDEX, HAND_R_INDEX, FOREARM_R_PIVOT,
  FACE_ANCHOR, FACE_SIZE
} from './Stickman';

// [localY, scaleXZ, scaleY, meshKind] pieces per hat type (0 = bare head); meshKind 0 = cylinder, 1 = cone
// Types: 1 top hat, 2 bowler, 3 flat cap, 4 conical paddy hat
const HAT_PIECES: ReadonlyArray<ReadonlyArray<readonly [number, number, number, number]>> = [
  [],
  [[1.86, 0.62, 0.035, 0], [1.88, 0.36, 0.30, 0]],
  [[1.87, 0.56, 0.03, 0], [1.88, 0.44, 0.16, 0]],
  [[1.90, 0.55, 0.06, 0]],
  [[1.80, 1.15, 0.42, 1]]
];

const FOG_COLOR_R = 0.44;
const FOG_COLOR_G = 0.34;
const FOG_COLOR_B = 0.23;
const FOG_DENSITY = 0.0145; // smoggier haze over the village
const SMOKE_COLOR: readonly [number, number, number] = [0.24, 0.21, 0.19]; // sooty, reads against the haze
const WORLD_CURVE = 0.0045; // y drop = horizontal distance^2 * curve (rolling-world shader)
const FOV_Y_RAD = (72 * Math.PI) / 180;
const NEAR_PLANE = 0.08;
const FAR_PLANE = 600;

const BODY_SCALE_XZ = 0.7;
const BODY_HEIGHT = 1.25;
const HEAD_SIZE = 0.5;
const HEAD_CENTER_Y = BODY_HEIGHT + HEAD_SIZE * 0.5 + 0.03;

const STRUCTURE_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [0.55, 0.42, 0.26],
  [0.42, 0.44, 0.47],
  [0.62, 0.35, 0.18],
  [0.35, 0.48, 0.40],
  [0.50, 0.28, 0.30],
  [0.68, 0.56, 0.30],
  [0.30, 0.34, 0.52],
  [0.46, 0.38, 0.52]
];

export class Renderer {
  readonly canvas: HTMLCanvasElement;

  private readonly gl: WebGL2RenderingContext;
  private readonly groundProgram: ShaderProgram;
  private readonly solidProgram: ShaderProgram;
  private readonly ringProgram: ShaderProgram;
  private readonly groundMesh: Mesh;
  private readonly cubeMesh: Mesh;
  private readonly cylinderMesh: Mesh;
  private readonly quadMesh: Mesh;
  private readonly faceQuadMesh: Mesh;
  private readonly sphereMesh: Mesh;
  private readonly coneMesh: Mesh;
  private readonly grassProgram: ShaderProgram;
  private grassMesh: Mesh | null = null;
  private grassOutlineMesh: Mesh | null = null;
  private pathMesh: Mesh | null = null;
  private houseModels: Array<Array<{ mesh: Mesh; group: string }>> | null = null;
  private lampModel: Array<{ mesh: Mesh; group: string }> | null = null;
  private treeModel: Array<{ mesh: Mesh; group: string }> | null = null;
  private towerModel: Array<{ mesh: Mesh; group: string }> | null = null;
  private machineModels: Array<Array<{ mesh: Mesh; group: string }>> | null = null;
  private smokeProgram!: ShaderProgram;
  private smoke: SmokeSystem | null = null;
  private smokeEmitters: SmokeEmitter[] = [];
  private cosmetics: Map<string, Mesh> | null = null;
  private grassBlade: { positions: number[]; indices: number[] } | null = null;
  private features: WorldFeatures | null = null;
  private trees: TreeFeature[] = [];
  private readonly wallSegments: Array<readonly [number, number, number, number]> = [];
  private readonly overlay: DialogueOverlay;
  private readonly outlineProgram: ShaderProgram;
  private readonly faceProgram: ShaderProgram;
  private readonly rig: StickmanRig;
  private readonly faceAtlas: WebGLTexture;
  private readonly faceModel = Mat4.create();
  private readonly faceLocal = Mat4.create();
  private frameDt = 0;
  private frameNow = 0;
  private bobPhase = 0;
  private bobAmp = 0;
  private viewRollRad = 0;
  private readonly camBasis = new Float32Array(9); // rolled right, up, fwd
  private readonly armCam = Mat4.create();
  private readonly armLocal = Mat4.create();
  private readonly armModel = Mat4.create();

  private readonly proj = Mat4.create();
  private readonly view = Mat4.create();
  private readonly viewProj = Mat4.create();
  private readonly model = Mat4.create();
  private readonly frustum = new Float32Array(24);
  private boundVao: WebGLVertexArrayObject | null = null;
  private readonly skyProgram: ShaderProgram;
  private readonly skyVao: WebGLVertexArrayObject;
  private outlineMode = false;

  private running = false;
  private lastFrameTime = 0;
  private sizeDirty = true;
  private cachedSeed: bigint | null = null;
  private seedLo = 0;
  private seedHi = 0;

  private eyeX = 0;
  private eyeY = CAMERA_EYE_HEIGHT;
  private eyeZ = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.display = 'block';
    document.body.appendChild(this.canvas);

    const gl = this.canvas.getContext('webgl2', { stencil: true, antialias: true });
    if (!gl) throw new Error('WebGL2 is not supported');
    this.gl = gl;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B, 1.0);

    this.groundProgram = createProgram(gl, GROUND_GRID_VS, GROUND_GRID_FS, [
      'uViewProj', 'uCameraPos', 'uSeedLo', 'uSeedHi', 'uFogColor', 'uFogDensity', 'uCurve', 'uGroundOffset'
    ]);
    this.solidProgram = createProgram(gl, SOLID_VS, SOLID_FS, [
      'uViewProj', 'uModel', 'uBaseColor', 'uDirLightDir', 'uDirLightColor',
      'uPointLightPos', 'uPointLightColor', 'uAmbient', 'uCameraPos', 'uFogColor', 'uFogDensity', 'uCurve', 'uDetail'
    ]);
    this.ringProgram = createProgram(gl, RING_VS, RING_FS, [
      'uViewProj', 'uModel', 'uTime', 'uEnergy', 'uRingColor', 'uCameraPos', 'uCurve'
    ]);
    this.outlineProgram = createProgram(gl, OUTLINE_VS, OUTLINE_FS, [
      'uViewProj', 'uModel', 'uOutlineWidth', 'uCameraPos', 'uFogColor', 'uFogDensity', 'uCurve'
    ]);
    this.faceProgram = createProgram(gl, FACE_VS, FACE_FS, [
      'uViewProj', 'uModel', 'uUvRect', 'uTexture', 'uCameraPos', 'uCurve'
    ]);

    this.grassProgram = createProgram(gl, GRASS_VS, GRASS_FS, [
      'uViewProj', 'uTime', 'uCameraPos', 'uCurve', 'uFogColor', 'uFogDensity', 'uColorA', 'uColorB'
    ]);
    this.skyProgram = createProgram(gl, SKY_VS, SKY_FS, [
      'uCamFwd', 'uCamRight', 'uCamUp', 'uTanHalf', 'uAspect', 'uTime', 'uFogColor'
    ]);
    this.smokeProgram = createProgram(gl, SMOKE_VS, SMOKE_FS, [
      'uViewProj', 'uCamRight', 'uCamUp', 'uCameraPos', 'uCurve', 'uFogDensity', 'uSmokeColor', 'uFogColor'
    ]);
    this.smoke = new SmokeSystem(gl);
    const skyVao = gl.createVertexArray();
    if (!skyVao) throw new Error('Failed to create sky VAO');
    this.skyVao = skyVao;

    this.groundMesh = createGroundQuad(gl, 256);
    this.cubeMesh = createUnitCube(gl);
    this.cylinderMesh = createUnitCylinder(gl, 16);
    this.quadMesh = createUnitQuadXZ(gl);
    this.faceQuadMesh = createFaceQuad(gl);
    this.sphereMesh = createUnitSphere(gl);
    this.coneMesh = createUnitCone(gl);

    for (let s = -WORLD_RADIUS; s < WORLD_RADIUS; s += 4) {
      const c = s + 2;
      this.wallSegments.push(
        [c, -WORLD_RADIUS, 4.05, 0.7],
        [c, WORLD_RADIUS, 4.05, 0.7],
        [-WORLD_RADIUS, c, 0.7, 4.05],
        [WORLD_RADIUS, c, 0.7, 4.05]
      );
    }
    this.overlay = new DialogueOverlay();
    this.faceAtlas = buildFaceAtlas(gl);
    this.rig = new StickmanRig(gl);
    this.rig.load().catch((err) => {
      console.error('Stickman model failed to load, using primitive fallback', err);
    });
    this.loadHouseModels().catch((err) => {
      console.warn('House models unavailable, using primitive buildings', err);
    });

    window.addEventListener('resize', () => {
      this.sizeDirty = true;
    });
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    const frame = (now: number): void => {
      if (!this.running) return;
      const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
      this.lastFrameTime = now;
      this.renderFrame(now, dt);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  stop(): void {
    this.running = false;
  }

  private applySize(): void {
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(window.innerWidth * dpr));
    const height = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.gl.viewport(0, 0, width, height);
    Mat4.perspective(this.proj, FOV_Y_RAD, width / height, NEAR_PLANE, FAR_PLANE);
    this.sizeDirty = false;
  }

  private refreshSeed(): void {
    if (this.cachedSeed === clientState.worldSeed) return;
    this.cachedSeed = clientState.worldSeed;
    const mask = 0xffffffffn;
    this.seedLo = Number(this.cachedSeed & mask);
    this.seedHi = Number((this.cachedSeed >> 32n) & mask);
    this.features = generateWorldFeatures(this.seedLo);
    this.trees = this.features.trees;
    this.buildGrassMesh();
    this.buildPathMesh();
    this.buildSmokeEmitters();
  }

  // Blender stack-top of each machine variant, in model space (OBJ Y-up).
  private static readonly MACHINE_STACK: ReadonlyArray<readonly [number, number, number]> = [
    [0, 3.44, 0],       // boiler: tall central stack
    [-0.55, 1.6, 0.15]  // pump: short back-left stack
  ];

  private buildSmokeEmitters(): void {
    const f = this.features;
    if (!f) return;
    const emitters: SmokeEmitter[] = [];
    const mk = (x: number, y: number, z: number, rate: number, rise: number, spread: number, size: number): void => {
      emitters.push({ x, y, z, rate, rise, spread, size, accum: 0 });
    };
    // machine smokestacks
    for (const m of f.machines) {
      const [ox, oy, oz] = Renderer.MACHINE_STACK[m.variant] ?? Renderer.MACHINE_STACK[0];
      const c = Math.cos(m.rot), s = Math.sin(m.rot);
      mk(m.x + ox * c - oz * s, oy, m.z + ox * s + oz * c,
        m.variant === 0 ? 11 : 8, 1.35, 0.16, m.variant === 0 ? 0.42 : 0.32);
    }
    // house chimneys (the forge belches most)
    for (const b of f.buildings) {
      const cx = b.x0 + b.w / 2;
      const cz = b.z0 + b.d / 2;
      const forge = b.type === 1;
      mk(cx + (forge ? -b.w * 0.3 : b.w * 0.28), b.height + (forge ? 1.4 : 0.7), cz + b.d * 0.28,
        forge ? 10 : 5, 1.15, 0.3, forge ? 0.55 : 0.42);
    }
    // the central tower vents a faint plume
    mk(0, 6.0, 0, 5, 1.0, 0.4, 0.55);
    this.smokeEmitters = emitters;
  }

  private buildPathMesh(): void {
    if (!this.features) return;
    const cells = this.features.pathList;
    const vertices = new Float32Array(cells.length * 4 * 6);
    const indices = new Uint16Array(cells.length * 6);
    let v = 0;
    let ii = 0;
    let base = 0;
    for (const c of cells) {
      const tint = cellHash01(c.x, c.z);
      const corners: ReadonlyArray<readonly [number, number]> = [
        [c.x, c.z], [c.x + 1, c.z], [c.x + 1, c.z + 1], [c.x, c.z + 1]
      ];
      for (const [cx, cz] of corners) {
        vertices[v++] = cx; vertices[v++] = 0.015; vertices[v++] = cz;
        vertices[v++] = 0; vertices[v++] = tint; vertices[v++] = 0;
      }
      indices[ii++] = base; indices[ii++] = base + 2; indices[ii++] = base + 1;
      indices[ii++] = base; indices[ii++] = base + 3; indices[ii++] = base + 2;
      base += 4;
    }
    this.pathMesh = createMeshFromArrays(this.gl, vertices, indices);
  }

  private buildGrassMesh(): void {
    if (!this.features || !this.grassBlade) return; // rebuilt once the blade loads
    const tufts = generateGrass(this.seedLo, this.features);
    // widthMul, extraHeight: the outline copy is fatter & slightly taller
    this.grassMesh = this.buildTuftMesh(tufts, 1.0, 0.0);
    this.grassOutlineMesh = this.buildTuftMesh(tufts, 1.4, 0.04);
  }

  /** Stamp the Blender grass clump (unit-height, Y-up) at every tuft; wind-sway
   *  weight comes from each blade vertex's height fraction (root 0 → tip 1). */
  private buildTuftMesh(
    tufts: ReadonlyArray<{ x: number; z: number; height: number; angle: number; colorVar: number }>,
    widthMul: number,
    extraH: number
  ): Mesh {
    const blade = this.grassBlade!;
    const vcount = blade.positions.length / 3;
    const vertices = new Float32Array(tufts.length * vcount * 6);
    const indices = new Uint32Array(tufts.length * blade.indices.length);
    let v = 0;
    let ii = 0;
    let base = 0;
    for (const t of tufts) {
      const ca = Math.cos(t.angle);
      const sa = Math.sin(t.angle);
      const h = t.height + extraH;
      for (let bi = 0; bi < vcount; bi++) {
        const lx = blade.positions[bi * 3] * widthMul;
        const ly = blade.positions[bi * 3 + 1]; // 0..1 height fraction
        const lz = blade.positions[bi * 3 + 2] * widthMul;
        vertices[v++] = t.x + (lx * ca - lz * sa);
        vertices[v++] = ly * h;
        vertices[v++] = t.z + (lx * sa + lz * ca);
        vertices[v++] = ly;           // sway weight
        vertices[v++] = t.colorVar;   // colorVar
        vertices[v++] = 0;
      }
      for (const idx of blade.indices) indices[ii++] = base + idx;
      base += vcount;
    }
    return createMeshFromArrays32(this.gl, vertices, indices);
  }

  private drawGrass(now: number): void {
    if (!this.grassMesh) return;
    const gl = this.gl;
    const u = this.grassProgram.uniforms;
    gl.useProgram(this.grassProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform1f(u.uTime, now / 1000);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
    gl.uniform3f(u.uFogColor, FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B);
    gl.uniform1f(u.uFogDensity, FOG_DENSITY);

    if (this.pathMesh) {
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(-1.0, -1.0);
      gl.uniform3f(u.uColorA, 0.34, 0.28, 0.20);
      gl.uniform3f(u.uColorB, 0.47, 0.38, 0.26);
      this.bindVao(this.pathMesh.vao);
      gl.drawElements(gl.TRIANGLES, this.pathMesh.indexCount, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);
    }

    if (this.grassOutlineMesh) {
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(2.0, 2.0);
      gl.uniform3f(u.uColorA, 0.03, 0.025, 0.02);
      gl.uniform3f(u.uColorB, 0.03, 0.025, 0.02);
      this.bindVao(this.grassOutlineMesh.vao);
      gl.drawElements(gl.TRIANGLES, this.grassOutlineMesh.indexCount, this.grassOutlineMesh.indexType ?? gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);
    }

    gl.uniform3f(u.uColorA, 0.48, 0.42, 0.16);
    gl.uniform3f(u.uColorB, 0.60, 0.51, 0.21);
    this.bindVao(this.grassMesh.vao);
    gl.drawElements(gl.TRIANGLES, this.grassMesh.indexCount, this.grassMesh.indexType ?? gl.UNSIGNED_SHORT, 0);
  }

  private updateLocalPlayer(now: number, dt: number): void {
    const pred = clientState.localPrediction;
    const decay = Math.exp(-ERROR_OFFSET_DECAY_RATE * dt);
    pred.visualErrorOffset.x *= decay;
    pred.visualErrorOffset.y *= decay;
    pred.visualErrorOffset.z *= decay;

    const elapsed = now - pred.lastPredictStepTime;
    const prev = pred.prevPredictedPos;
    const curr = pred.predictedPos;
    let rx: number;
    let ry: number;
    let rz: number;
    if (elapsed <= SNAPSHOT_INTERVAL_MS) {
      const t = Math.max(0, elapsed / SNAPSHOT_INTERVAL_MS);
      rx = prev.x + (curr.x - prev.x) * t;
      ry = prev.y + (curr.y - prev.y) * t;
      rz = prev.z + (curr.z - prev.z) * t;
    } else {
      // Tick ran late: extrapolate briefly along predicted velocity instead of freezing
      const extra = Math.min(elapsed - SNAPSHOT_INTERVAL_MS, 40) / 1000;
      rx = curr.x + pred.predictedVel.x * extra;
      ry = curr.y + pred.predictedVel.y * extra;
      rz = curr.z + pred.predictedVel.z * extra;
    }
    rx += pred.visualErrorOffset.x;
    ry += pred.visualErrorOffset.y;
    rz += pred.visualErrorOffset.z;

    if (clientState.myNetId != null) {
      const self = clientState.entities.get(clientState.myNetId);
      if (self) {
        self.renderPos.x = rx;
        self.renderPos.y = ry;
        self.renderPos.z = rz;
      }
    }

    // View bobbing as a subtle camera roll oscillation, plus a faint vertical bounce;
    // grounded-and-moving only, amplitude eased in and out
    const vel = pred.predictedVel;
    const speed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
    const grounded = pred.predictedPos.y <= 0.001;
    const bobTarget = grounded && speed > 0.3 ? Math.min(1, speed / 6) : 0;
    this.bobAmp += (bobTarget - this.bobAmp) * Math.min(1, dt * 8);
    if (this.bobAmp > 0.02) this.bobPhase += dt * (6.5 + speed * 1.2);
    this.viewRollRad = Math.sin(this.bobPhase) * 0.021 * this.bobAmp;
    const bobV = Math.sin(this.bobPhase * 2) * 0.012 * this.bobAmp;

    this.eyeX = rx;
    this.eyeY = ry + CAMERA_EYE_HEIGHT + bobV;
    this.eyeZ = rz;
  }

  private updateRemoteEntities(now: number): void {
    const myNetId = clientState.myNetId;
    const offset = clientState.serverClockOffsetMs;
    const hasClock = Number.isFinite(offset);
    const renderTime = now - offset - INTERP_DELAY_MS;

    for (const entity of clientState.entities.values()) {
      if (myNetId != null && entity.netId === myNetId) continue;
      const snaps = entity.snapshots;
      if (!hasClock || snaps.length === 0) {
        entity.renderPos.x = entity.targetPos.x;
        entity.renderPos.y = entity.targetPos.y;
        entity.renderPos.z = entity.targetPos.z;
        continue;
      }

      while (snaps.length > 1 && snaps[1].t <= renderTime) snaps.shift();
      const a = snaps[0];

      if (renderTime <= a.t) {
        entity.renderPos.x = a.x;
        entity.renderPos.y = a.y;
        entity.renderPos.z = a.z;
      } else if (snaps.length > 1) {
        const b = snaps[1];
        const f = (renderTime - a.t) / (b.t - a.t);
        entity.renderPos.x = a.x + (b.x - a.x) * f;
        entity.renderPos.y = a.y + (b.y - a.y) * f;
        entity.renderPos.z = a.z + (b.z - a.z) * f;
      } else {
        const extra = Math.min(renderTime - a.t, INTERP_EXTRAP_MAX_MS) / 1000;
        entity.renderPos.x = a.x + a.vx * extra;
        entity.renderPos.y = a.y + a.vy * extra;
        entity.renderPos.z = a.z + a.vz * extra;
      }
    }
  }

  private renderFrame(now: number, dt: number): void {
    const gl = this.gl;
    if (this.sizeDirty) this.applySize();
    this.refreshSeed();
    this.updateLocalPlayer(now, dt);
    this.updateRemoteEntities(now);

    this.computeCamBasis();
    const b = this.camBasis;

    Mat4.lookAt(
      this.view,
      this.eyeX, this.eyeY, this.eyeZ,
      this.eyeX + b[6], this.eyeY + b[7], this.eyeZ + b[8],
      b[3], b[4], b[5]
    );
    Mat4.multiply(this.viewProj, this.proj, this.view);
    this.updateFrustum();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    this.frameDt = dt;
    this.frameNow = now;
    this.updateSmoke(dt);
    this.rig.prune();
    this.drawSky(now);
    this.drawGround();
    this.drawGrass(now);
    this.drawSolids();
    this.drawStickmanOutlines();
    this.drawWorldOutlines();
    this.drawFaces();
    this.drawSmoke();
    this.drawRings(now);
    this.drawFirstPersonArm();

    this.overlay.update(this.viewProj, now, this.eyeX, this.eyeZ, WORLD_CURVE);
  }

  private computeCamBasis(): void {
    const yaw = clientState.cameraYawRad;
    const pitch = clientState.cameraPitchRad;
    const cosP = Math.cos(pitch);
    const fx = Math.sin(yaw) * cosP;
    const fy = Math.sin(pitch);
    const fz = -Math.cos(yaw) * cosP;
    let rx = Math.cos(yaw);
    let ry = 0;
    let rz = Math.sin(yaw);
    let ux = -rz * fy;
    let uy = rz * fx - rx * fz;
    let uz = rx * fy;
    const roll = this.viewRollRad;
    if (roll !== 0) {
      const cr = Math.cos(roll);
      const sr = Math.sin(roll);
      const nrx = rx * cr - ux * sr;
      const nry = ry * cr - uy * sr;
      const nrz = rz * cr - uz * sr;
      ux = ux * cr + rx * sr;
      uy = uy * cr + ry * sr;
      uz = uz * cr + rz * sr;
      rx = nrx; ry = nry; rz = nrz;
    }
    const b = this.camBasis;
    b[0] = rx; b[1] = ry; b[2] = rz;
    b[3] = ux; b[4] = uy; b[5] = uz;
    b[6] = fx; b[7] = fy; b[8] = fz;
  }

  private updateFrustum(): void {
    const m = this.viewProj;
    const f = this.frustum;
    // Column-major viewProj rows: rowN = (m[N], m[4+N], m[8+N], m[12+N]).
    // Planes left/right/bottom/top/near/far = row3 +/- row0/row1/row2, normalized.
    for (let p = 0; p < 6; p++) {
      const ri = p >> 1;
      const s = (p & 1) === 0 ? 1 : -1;
      let nx = m[3] + s * m[ri];
      let ny = m[7] + s * m[4 + ri];
      let nz = m[11] + s * m[8 + ri];
      let d = m[15] + s * m[12 + ri];
      const invLen = 1.0 / Math.hypot(nx, ny, nz);
      nx *= invLen; ny *= invLen; nz *= invLen; d *= invLen;
      f[p * 4] = nx;
      f[p * 4 + 1] = ny;
      f[p * 4 + 2] = nz;
      f[p * 4 + 3] = d;
    }
  }

  private sphereVisible(x: number, y: number, z: number, radius: number): boolean {
    const dx = x - this.eyeX;
    const dz = z - this.eyeZ;
    y -= (dx * dx + dz * dz) * WORLD_CURVE;
    const f = this.frustum;
    for (let p = 0; p < 6; p++) {
      if (f[p * 4] * x + f[p * 4 + 1] * y + f[p * 4 + 2] * z + f[p * 4 + 3] < -radius) {
        return false;
      }
    }
    return true;
  }

  private bindVao(vao: WebGLVertexArrayObject): void {
    if (this.boundVao === vao) return;
    this.gl.bindVertexArray(vao);
    this.boundVao = vao;
  }

  private drawGround(): void {
    const gl = this.gl;
    const u = this.groundProgram.uniforms;
    gl.useProgram(this.groundProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform1ui(u.uSeedLo, this.seedLo);
    gl.uniform1ui(u.uSeedHi, this.seedHi);
    gl.uniform3f(u.uFogColor, FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B);
    gl.uniform1f(u.uFogDensity, FOG_DENSITY);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
    gl.uniform2f(u.uGroundOffset, Math.round(this.eyeX), Math.round(this.eyeZ));
    this.bindVao(this.groundMesh.vao);
    gl.drawElements(gl.TRIANGLES, this.groundMesh.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  private bindSolidProgram(): void {
    const gl = this.gl;
    const u = this.solidProgram.uniforms;
    gl.useProgram(this.solidProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform3f(u.uDirLightDir, -0.45, -0.75, -0.35);
    gl.uniform3f(u.uDirLightColor, 0.85, 0.78, 0.62);
    gl.uniform3f(u.uPointLightPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform3f(u.uPointLightColor, 0.9, 0.62, 0.28);
    gl.uniform3f(u.uAmbient, 0.22, 0.20, 0.17);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform3f(u.uFogColor, FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B);
    gl.uniform1f(u.uFogDensity, FOG_DENSITY);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
    gl.uniform1f(u.uDetail, 0);
  }

  private drawMesh(mesh: Mesh, r: number, g: number, b: number, matrix: Float32Array = this.model): void {
    const gl = this.gl;
    if (this.outlineMode) {
      gl.uniformMatrix4fv(this.outlineProgram.uniforms.uModel, false, matrix);
      this.bindVao(mesh.vao);
      gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);
      return;
    }
    const u = this.solidProgram.uniforms;
    gl.uniform3f(u.uBaseColor, r, g, b);
    gl.uniformMatrix4fv(u.uModel, false, matrix);
    this.bindVao(mesh.vao);
    gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  private drawHatPieces(style: StickStyle, matrices: Float32Array): void {
    const cos = this.cosmetics;
    const headM = matrices.subarray(HEAD_INDEX * 16, HEAD_INDEX * 16 + 16);
    if (!cos) {
      this.drawHatPiecesFallback(style, headM);
      return;
    }
    const torsoM = matrices.subarray(0, 16);
    const BRASS: readonly [number, number, number] = [0.69, 0.55, 0.34];
    const GLASS: readonly [number, number, number] = [0.28, 0.36, 0.40];
    const LEATHER: readonly [number, number, number] = [0.28, 0.18, 0.10];
    const STRAW: readonly [number, number, number] = [0.72, 0.60, 0.36];
    const draw = (group: string, m: Float32Array, c: readonly [number, number, number]): void => {
      const mesh = cos.get(group);
      if (mesh) this.drawMesh(mesh, c[0], c[1], c[2], m);
    };
    // hair (drawn in the character's hair colour)
    if (style.hairStyle === 1) draw('hair_long', headM, style.hairColor);
    else if (style.hairStyle === 2) draw('hair_topknot', headM, style.hairColor);
    // hat
    const hc = style.hatColor;
    if (style.hatType === 1) { draw('tophat_felt', headM, hc); draw('tophat_brass', headM, BRASS); }
    else if (style.hatType === 2) draw('bowler_felt', headM, hc);
    else if (style.hatType === 3) draw('flatcap_felt', headM, hc);
    else if (style.hatType === 4) draw('paddyhat', headM, STRAW);
    else if (style.hatType === 5) {
      draw('clockhat_felt', headM, [0.12, 0.10, 0.09]); // near-black felt
      draw('clockhat_brass', headM, BRASS);
      draw('clockhat_gear', headM, [0.80, 0.64, 0.38]); // bright brass gears
    }
    // random steampunk extras
    if (style.hasGoggles) {
      draw('goggles_brass', headM, BRASS);
      draw('goggles_glass', headM, GLASS);
      draw('goggles_strap', headM, LEATHER);
    }
    if (style.hasMonocle) {
      draw('monocle_brass', headM, BRASS);
      draw('monocle_glass', headM, GLASS);
      draw('monocle_chain', headM, [0.80, 0.64, 0.38]);
    }
    if (style.hasMustache) draw('mustache', headM, [0.20, 0.13, 0.08]);
    if (style.hasBackpack) {
      draw('backpack_brass', torsoM, BRASS);
      draw('backpack_strap', torsoM, LEATHER);
    }
  }

  private drawHatPiecesFallback(style: StickStyle, headM: Float32Array): void {
    if (style.hairStyle > 0) {
      const [hr, hg, hb] = style.hairColor;
      Mat4.fromTranslationRotationScale(this.faceLocal, 0, 1.6, 0.08, 0, 0.56, 0.36, 0.52);
      Mat4.multiply(this.faceModel, headM, this.faceLocal);
      this.drawMesh(this.cylinderMesh, hr, hg, hb, this.faceModel);
    }
    const pieces = HAT_PIECES[style.hatType] ?? [];
    const [hr, hg, hb] = style.hatColor;
    for (const [py, sxz, sy, kind] of pieces) {
      Mat4.fromTranslationRotationScale(this.faceLocal, 0, py, 0, 0, sxz, sy, sxz);
      Mat4.multiply(this.faceModel, headM, this.faceLocal);
      this.drawMesh(kind === 1 ? this.coneMesh : this.cylinderMesh, hr, hg, hb, this.faceModel);
    }
  }

  private drawSolids(): void {
    const gl = this.gl;
    this.bindSolidProgram();
    const myNetId = clientState.myNetId;

    // Character pixels write stencil=1 so the outline pass can be masked to the silhouette only
    gl.enable(gl.STENCIL_TEST);
    gl.stencilFunc(gl.ALWAYS, 1, 0xff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

    for (const entity of clientState.entities.values()) {
      if (myNetId != null && entity.netId === myNetId) continue;
      if (!this.sphereVisible(entity.renderPos.x, entity.renderPos.y + 1.0, entity.renderPos.z, 1.6)) continue;
      const r = ((entity.baseColorHex >> 16) & 255) / 255;
      const g = ((entity.baseColorHex >> 8) & 255) / 255;
      const b = (entity.baseColorHex & 255) / 255;
      const p = entity.renderPos;

      if (this.rig.ready) {
        const state = this.rig.update(entity, this.frameDt, this.frameNow);
        const shade = state.style.limbShade;
        for (let i = 0; i < PART_COUNT; i++) {
          const group = partShadeGroup(i);
          const k = group === 1 ? shade : group === 2 ? 1.12 : 1.0;
          this.drawMesh(
            this.rig.meshes[i],
            Math.min(1, r * k), Math.min(1, g * k), Math.min(1, b * k),
            state.matrices.subarray(i * 16, i * 16 + 16)
          );
        }
        this.drawHatPieces(state.style, state.matrices);
        continue;
      }

      Mat4.fromTranslationRotationScale(
        this.model,
        p.x, p.y, p.z,
        entity.yawRad,
        BODY_SCALE_XZ, BODY_HEIGHT, BODY_SCALE_XZ
      );
      this.drawMesh(this.cylinderMesh, r, g, b);

      Mat4.fromTranslationRotationScale(
        this.model,
        p.x, p.y + HEAD_CENTER_Y, p.z,
        entity.yawRad,
        HEAD_SIZE, HEAD_SIZE, HEAD_SIZE
      );
      this.drawMesh(this.cubeMesh, Math.min(r * 1.25 + 0.08, 1), Math.min(g * 1.25 + 0.08, 1), Math.min(b * 1.25 + 0.08, 1));
    }

    gl.disable(gl.STENCIL_TEST);
    this.drawWorldProps();
  }

  private drawWorldProps(): void {
    for (const delta of clientState.worldDeltas.values()) {
      if (!this.sphereVisible(delta.gridX + 0.5, delta.gridY + 0.5, delta.gridZ + 0.5, 0.87)) continue;
      const color = STRUCTURE_COLORS[((delta.structureType % STRUCTURE_COLORS.length) + STRUCTURE_COLORS.length) % STRUCTURE_COLORS.length];
      Mat4.fromTranslationRotationScale(
        this.model,
        delta.gridX + 0.5, delta.gridY + 0.5, delta.gridZ + 0.5,
        0,
        1, 1, 1
      );
      this.drawMesh(this.cubeMesh, color[0], color[1], color[2]);
    }

    for (const tree of this.trees) {
      if (!this.sphereVisible(tree.x, tree.trunkHeight * 0.5, tree.z, tree.trunkHeight + tree.foliageRadius * 2.2)) continue;
      if (this.treeModel) {
        const s = tree.foliageRadius;
        Mat4.fromTranslationRotationScale(this.model, tree.x, 0, tree.z, tree.tint * Math.PI * 2, s, s, s);
        for (const part of this.treeModel) {
          const [r, g, bl] = this.propColor(part.group);
          this.drawMesh(part.mesh, r, g, bl, this.model);
        }
        continue;
      }
      Mat4.fromTranslationRotationScale(this.model, tree.x, 0, tree.z, 0, 0.62, tree.trunkHeight, 0.62);
      this.drawMesh(this.cylinderMesh, 0.33, 0.24, 0.16);
      const fr = tree.foliageRadius;
      const fg = 0.42 + tree.tint * 0.09;
      Mat4.fromTranslationRotationScale(this.model, tree.x, tree.trunkHeight + fr * 0.6, tree.z, 0, fr * 2.2, fr * 2.0, fr * 2.2);
      this.drawMesh(this.sphereMesh, 0.48 + tree.tint * 0.12, fg, 0.14);
      Mat4.fromTranslationRotationScale(this.model, tree.x + fr * 0.7, tree.trunkHeight + fr * 0.3, tree.z + fr * 0.35, 0, fr * 1.5, fr * 1.4, fr * 1.5);
      this.drawMesh(this.sphereMesh, 0.44 + tree.tint * 0.12, fg * 0.92, 0.13);
      Mat4.fromTranslationRotationScale(this.model, tree.x - fr * 0.6, tree.trunkHeight + fr * 0.25, tree.z - fr * 0.4, 0, fr * 1.4, fr * 1.3, fr * 1.4);
      this.drawMesh(this.sphereMesh, 0.52 + tree.tint * 0.12, fg * 1.05, 0.15);
    }

    this.drawMachines();
    this.drawVillage();

    for (const [wx, wz, sx, sz] of this.wallSegments) {
      if (!this.sphereVisible(wx, 0.65, wz, 3.2)) continue;
      Mat4.fromTranslationRotationScale(this.model, wx, 0.65, wz, 0, sx, 1.3, sz);
      this.drawMesh(this.cubeMesh, 0.33, 0.31, 0.28);
    }
  }

  private async loadHouseModels(): Promise<void> {
    const keys = ['cottage', 'forge', 'warehouse', 'twostory', 'shop'];
    const models = await Promise.all(keys.map(async (key) => {
      const res = await fetch(`/models/houses/house_${key}.obj`);
      if (!res.ok) throw new Error(`house_${key}.obj ${res.status}`);
      return parseObj(await res.text()).map((part) => ({
        mesh: createMeshFromArrays(this.gl, part.vertices, part.indices),
        group: part.name.split('.')[0]
      }));
    }));
    this.houseModels = models;

    const loadProp = async (name: string): Promise<Array<{ mesh: Mesh; group: string }> | null> => {
      const res = await fetch(`/models/props/${name}.obj`);
      if (!res.ok) return null;
      return parseObj(await res.text()).map((part) => ({
        mesh: createMeshFromArrays(this.gl, part.vertices, part.indices),
        group: part.name.split('.')[0]
      }));
    };
    this.lampModel = await loadProp('lamp');
    this.treeModel = await loadProp('tree');
    const boiler = await loadProp('machine_boiler');
    const pump = await loadProp('machine_pump');
    if (boiler && pump) this.machineModels = [boiler, pump];
    this.towerModel = await loadProp('tower');

    const cosmRes = await fetch('/models/props/cosmetics.obj');
    if (cosmRes.ok) {
      const map = new Map<string, Mesh>();
      for (const part of parseObj(await cosmRes.text())) {
        map.set(part.name.split('.')[0], createMeshFromArrays(this.gl, part.vertices, part.indices));
      }
      this.cosmetics = map;
    }

    const grassRes = await fetch('/models/props/grass.obj');
    if (grassRes.ok) {
      const parts = parseObj(await grassRes.text());
      if (parts.length > 0) {
        const positions: number[] = [];
        for (let i = 0; i < parts[0].vertices.length; i += 6) {
          positions.push(parts[0].vertices[i], parts[0].vertices[i + 1], parts[0].vertices[i + 2]);
        }
        this.grassBlade = { positions, indices: Array.from(parts[0].indices) };
      }
      if (this.features) this.buildGrassMesh();
    }
  }

  private propColor(group: string): readonly [number, number, number] {
    switch (group) {
      case 'iron': return [0.15, 0.14, 0.14];
      case 'brass': return [0.69, 0.55, 0.34];
      case 'glass': return [0.98, 0.82, 0.45];
      case 'stone': return [0.34, 0.31, 0.28];
      case 'face': return [0.85, 0.78, 0.60];
      case 'copper': return [0.55, 0.33, 0.20];
      case 'bark': return [0.30, 0.21, 0.13];
      case 'leaf': return [0.53, 0.47, 0.17];
      case 'leaf2': return [0.45, 0.40, 0.14];
      default: return [0.5, 0.45, 0.4];
    }
  }

  private houseGroupColor(group: string, type: number, tintMul: number): readonly [number, number, number] {
    switch (group) {
      case 'wall':
        if (type === 1) return [0.50 * tintMul, 0.29 * tintMul, 0.22 * tintMul];
        if (type === 2) return [0.44 * tintMul, 0.42 * tintMul, 0.38 * tintMul];
        if (type === 4) return [0.72 * tintMul, 0.60 * tintMul, 0.42 * tintMul];
        return [0.76 * tintMul, 0.68 * tintMul, 0.55 * tintMul];
      case 'roof':
        if (type === 0) return [0.46, 0.23, 0.17];
        if (type === 1) return [0.30, 0.31, 0.35];
        if (type === 2) return [0.31, 0.33, 0.39];
        if (type === 3) return [0.36, 0.30, 0.40];
        return [0.37, 0.34, 0.28];
      case 'door': return [0.22, 0.15, 0.10];
      case 'trim': return [0.27, 0.19, 0.12];
      case 'window': return [0.95, 0.78, 0.38];
      case 'brass': return [0.69, 0.55, 0.34];
      case 'chimney': return [0.42, 0.25, 0.19];
      case 'floor': return [0.31, 0.22, 0.13];
      case 'awning': return [0.56, 0.30, 0.24];
      case 'sign': return [0.30, 0.22, 0.16];
      case 'furniture': return [0.40, 0.28, 0.17];
      case 'fabric': return [0.55, 0.26, 0.24];
      case 'metal': return [0.26, 0.26, 0.29];
      case 'lamp': return [0.95, 0.80, 0.42];
      default: return [0.5, 0.45, 0.4];
    }
  }

  private drawHouseModel(b: WorldFeatures['buildings'][number], tintMul: number): void {
    const parts = this.houseModels![Math.min(4, b.type)];
    const cx = b.x0 + b.w / 2;
    const cz = b.z0 + b.d / 2;
    const S = 6;
    // Outward direction from the door toward its front path cell (a world cardinal).
    // The model's door is on its local +Z face, which maps to world (-sin yaw, cos yaw).
    const outX = b.frontX - b.doorX;
    const outZ = b.frontZ - b.doorZ;
    const yaw = Math.atan2(-outX, outZ);
    const xEdge = outX !== 0;
    const sx = (xEdge ? b.d : b.w) / S;
    const sz = (xEdge ? b.w : b.d) / S;
    Mat4.fromTranslationRotationScale(this.model, cx, 0, cz, yaw, sx, 1, sz);
    // Procedural steampunk surface — only when the solid program is active (the outline
    // pass binds a different program, so touching this uniform there would corrupt it).
    const gl = this.gl;
    if (!this.outlineMode) gl.uniform1f(this.solidProgram.uniforms.uDetail, 1);
    // Route through drawMesh so it honors outlineMode (direct uniform writes would
    // clobber the wrong program during the outline pass).
    for (const part of parts) {
      const [r, g, bl] = this.houseGroupColor(part.group, b.type, tintMul);
      this.drawMesh(part.mesh, r, g, bl, this.model);
    }
    if (!this.outlineMode) gl.uniform1f(this.solidProgram.uniforms.uDetail, 0);
  }

  private drawYardClutter(b: WorldFeatures['buildings'][number]): void {
    const cyl = (cx: number, cy: number, cz: number, sxz: number, sy: number, r: number, g: number, bl: number) => {
      Mat4.fromTranslationRotationScale(this.model, cx, cy, cz, 0, sxz, sy, sxz);
      this.drawMesh(this.cylinderMesh, r, g, bl);
    };
    const yardHash = cellHash01(b.x0, b.z0);
    if (yardHash > 0.3) {
      const bx = b.x0 + b.w + 0.45;
      const bz = b.z0 + 0.7;
      cyl(bx, 0, bz, 0.55, 0.72, 0.38, 0.27, 0.17);
      cyl(bx, 0.3, bz, 0.58, 0.07, 0.69, 0.55, 0.34);
    }
    if (yardHash > 0.55) {
      Mat4.fromTranslationRotationScale(this.model, b.x0 - 0.5, 0.3, b.z0 + b.d - 0.8, 0, 0.62, 0.62, 0.62);
      this.drawMesh(this.cubeMesh, 0.42, 0.31, 0.19);
    }
    if (yardHash > 0.8) {
      cyl(b.x0 + b.w + 0.45, 0, b.z0 + 1.65, 0.5, 0.6, 0.38, 0.27, 0.17);
    }
  }

  private updateSmoke(dt: number): void {
    if (!this.smoke) return;
    const now = this.frameNow;
    const windX = 0.35 + Math.cos(now * 0.00006) * 0.35;
    const windZ = Math.sin(now * 0.00005) * 0.35;
    this.smoke.update(dt, this.smokeEmitters, windX, windZ, this.eyeX, this.eyeZ);
  }

  private drawSmoke(): void {
    if (!this.smoke) return;
    const b = this.camBasis;
    this.smoke.draw(
      this.smokeProgram, this.viewProj,
      [b[0], b[1], b[2]], [b[3], b[4], b[5]],
      [this.eyeX, this.eyeY, this.eyeZ],
      WORLD_CURVE, FOG_DENSITY, SMOKE_COLOR,
      [FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B]
    );
  }

  private drawMachines(): void {
    const f = this.features;
    if (!f || !this.machineModels) return;
    for (const m of f.machines) {
      if (!this.sphereVisible(m.x, 1.6, m.z, 4)) continue;
      const model = this.machineModels[m.variant] ?? this.machineModels[0];
      Mat4.fromTranslationRotationScale(this.model, m.x, 0, m.z, m.rot, 1, 1, 1);
      for (const part of model) {
        const [r, g, bl] = this.propColor(part.group);
        this.drawMesh(part.mesh, r, g, bl, this.model);
      }
    }
  }

  private drawVillage(): void {
    const f = this.features;
    if (!f) return;
    const spin = this.frameNow / 1000;

    if (this.houseModels) {
      for (const b of f.buildings) {
        const cx = b.x0 + b.w / 2;
        const cz = b.z0 + b.d / 2;
        if (!this.sphereVisible(cx, b.height, cz, Math.max(b.w, b.d) + 4)) continue;
        this.drawHouseModel(b, 0.9 + b.tint * 0.2);
        this.drawYardClutter(b);
        if (b.type === 1) {
          // spinning brass gear on the forge roof
          for (const rot of [spin * 0.8, spin * 0.8 + Math.PI / 2]) {
            Mat4.fromTranslationRotationScale(this.model, cx, b.height + 0.9, cz, rot, 1.9, 0.14, 0.45);
            this.drawMesh(this.cubeMesh, 0.69, 0.55, 0.34);
          }
        }
      }
      this.drawTowerAndLamps(spin);
      return;
    }
    const model = this.model;
    const box = (cx: number, cy: number, cz: number, sx: number, sy: number, sz: number, r: number, g: number, bl: number) => {
      Mat4.fromTranslationRotationScale(model, cx, cy, cz, 0, sx, sy, sz);
      this.drawMesh(this.cubeMesh, r, g, bl);
    };
    const cyl = (cx: number, cy: number, cz: number, sxz: number, sy: number, r: number, g: number, bl: number) => {
      Mat4.fromTranslationRotationScale(model, cx, cy, cz, 0, sxz, sy, sxz);
      this.drawMesh(this.cylinderMesh, r, g, bl);
    };

    const TIMBER: readonly [number, number, number] = [0.27, 0.19, 0.12];
    const WOOD_DARK: readonly [number, number, number] = [0.22, 0.15, 0.10];
    const GLOW: readonly [number, number, number] = [0.95, 0.78, 0.38];
    const BRASS: readonly [number, number, number] = [0.69, 0.55, 0.34];

    for (const b of f.buildings) {
      const cx = b.x0 + b.w / 2;
      const cz = b.z0 + b.d / 2;
      const hgt = b.height;
      if (!this.sphereVisible(cx, hgt, cz, Math.max(b.w, b.d) + 4)) continue;
      const tintMul = 0.9 + b.tint * 0.2;
      let wr: number;
      let wg: number;
      let wb: number;
      if (b.type === 1) { wr = 0.50 * tintMul; wg = 0.29 * tintMul; wb = 0.22 * tintMul; }
      else if (b.type === 2) { wr = 0.44 * tintMul; wg = 0.42 * tintMul; wb = 0.38 * tintMul; }
      else if (b.type === 4) { wr = 0.72 * tintMul; wg = 0.60 * tintMul; wb = 0.42 * tintMul; }
      else { wr = 0.76 * tintMul; wg = 0.68 * tintMul; wb = 0.55 * tintMul; }

      const doorOnZ = b.doorZ === b.z0 || b.doorZ === b.z0 + b.d - 1;
      const doorLoX = Math.min(b.doorX, b.doorX2);
      const doorHiX = Math.max(b.doorX, b.doorX2);
      const doorLoZ = Math.min(b.doorZ, b.doorZ2);
      const doorHiZ = Math.max(b.doorZ, b.doorZ2);
      const dnx = doorOnZ ? 0 : (b.doorX === b.x0 ? -1 : 1);
      const dnz = doorOnZ ? (b.doorZ === b.z0 ? -1 : 1) : 0;

      // merged wall slabs with a gap for the door
      const wallX = (fromX: number, toX: number, zRow: number) => {
        if (toX <= fromX) return;
        box((fromX + toX) / 2, hgt / 2, zRow + 0.5, toX - fromX, hgt, 1, wr, wg, wb);
      };
      const wallZ = (fromZ: number, toZ: number, xCol: number) => {
        if (toZ <= fromZ) return;
        box(xCol + 0.5, hgt / 2, (fromZ + toZ) / 2, 1, hgt, toZ - fromZ, wr, wg, wb);
      };
      for (const zRow of [b.z0, b.z0 + b.d - 1]) {
        if (doorOnZ && b.doorZ === zRow) {
          wallX(b.x0, doorLoX, zRow);
          wallX(doorHiX + 1, b.x0 + b.w, zRow);
        } else {
          wallX(b.x0, b.x0 + b.w, zRow);
        }
      }
      for (const xCol of [b.x0, b.x0 + b.w - 1]) {
        if (!doorOnZ && b.doorX === xCol) {
          wallZ(b.z0 + 1, doorLoZ, xCol);
          wallZ(doorHiZ + 1, b.z0 + b.d - 1, xCol);
        } else {
          wallZ(b.z0 + 1, b.z0 + b.d - 1, xCol);
        }
      }

      // timber framing on plaster builds: corner posts + beam rings (story line on tall houses)
      if (b.type === 0 || b.type === 3 || b.type === 4) {
        for (const px of [b.x0 + 0.11, b.x0 + b.w - 0.11]) {
          for (const pz of [b.z0 + 0.11, b.z0 + b.d - 0.11]) {
            box(px, hgt / 2, pz, 0.24, hgt + 0.04, 0.24, ...TIMBER);
          }
        }
        const beamYs = hgt === 3 ? [1.98, hgt - 0.1] : [hgt - 0.1];
        for (const by of beamYs) {
          box(cx, by, b.z0 + 0.5, b.w + 0.1, 0.16, 1.1, ...TIMBER);
          box(cx, by, b.z0 + b.d - 0.5, b.w + 0.1, 0.16, 1.1, ...TIMBER);
          box(b.x0 + 0.5, by, cz, 1.1, 0.16, b.d + 0.1, ...TIMBER);
          box(b.x0 + b.w - 0.5, by, cz, 1.1, 0.16, b.d + 0.1, ...TIMBER);
        }
      }

      // door panel, brass knob, lintel beam
      const doorMidX = doorOnZ ? doorLoX + 1 : b.doorX + 0.5;
      const doorMidZ = doorOnZ ? b.doorZ + 0.5 : doorLoZ + 1;
      if (doorOnZ) {
        box(doorMidX, 0.95, doorMidZ, 1.8, 1.9, 0.18, ...WOOD_DARK);
        box(doorMidX, 2.04, doorMidZ, 2.3, 0.2, 1.12, ...TIMBER);
        box(doorMidX + 0.6, 1.0, doorMidZ + dnz * 0.14, 0.12, 0.12, 0.1, ...BRASS);
      } else {
        box(doorMidX, 0.95, doorMidZ, 0.18, 1.9, 1.8, ...WOOD_DARK);
        box(doorMidX, 2.04, doorMidZ, 1.12, 0.2, 2.3, ...TIMBER);
        box(doorMidX + dnx * 0.14, 1.0, doorMidZ + 0.6, 0.1, 0.12, 0.12, ...BRASS);
      }

      // glowing windows (two rows on tall houses)
      const windowRow = (wy: number) => {
        for (const [zRow, nz] of [[b.z0, -1], [b.z0 + b.d - 1, 1]] as const) {
          for (let x = b.x0 + 1; x < b.x0 + b.w - 1; x++) {
            if (doorOnZ && b.doorZ === zRow && x >= doorLoX && x <= doorHiX) continue;
            if ((x - b.x0) % 2 !== 1 || cellHash01(x * 3 + Math.round(wy), zRow) < 0.35) continue;
            const fz = zRow + 0.5 + nz * 0.53;
            box(x + 0.5, wy, fz, 0.62, 0.78, 0.1, ...TIMBER);
            box(x + 0.5, wy, fz + nz * 0.045, 0.45, 0.6, 0.08, ...GLOW);
          }
        }
        for (const [xCol, nx] of [[b.x0, -1], [b.x0 + b.w - 1, 1]] as const) {
          for (let z = b.z0 + 1; z < b.z0 + b.d - 1; z++) {
            if (!doorOnZ && b.doorX === xCol && z >= doorLoZ && z <= doorHiZ) continue;
            if ((z - b.z0) % 2 !== 1 || cellHash01(xCol, z * 3 + Math.round(wy)) < 0.35) continue;
            const fx = xCol + 0.5 + nx * 0.53;
            box(fx, wy, z + 0.5, 0.1, 0.78, 0.62, ...TIMBER);
            box(fx + nx * 0.045, wy, z + 0.5, 0.08, 0.6, 0.45, ...GLOW);
          }
        }
      };
      windowRow(1.35);
      if (hgt === 3) windowRow(2.45);

      // interior wooden floor
      box(cx, 0.035, cz, b.w - 2, 0.07, b.d - 2, 0.31, 0.22, 0.13);

      // roofs: distinct silhouette per type, consistent palette
      const roofY = hgt + 0.14;
      if (b.type === 0) {
        const rr = 0.46 * tintMul;
        const rg = 0.23 * tintMul;
        const rb = 0.17 * tintMul;
        box(cx, roofY, cz, b.w + 0.8, 0.3, b.d + 0.8, rr, rg, rb);
        box(cx, roofY + 0.3, cz, b.w * 0.64, 0.3, b.d * 0.64, rr * 1.08, rg * 1.08, rb * 1.08);
        box(cx, roofY + 0.58, cz, b.w * 0.3, 0.26, b.d * 0.3, rr * 1.16, rg * 1.16, rb * 1.16);
      } else if (b.type === 1) {
        box(cx, roofY, cz, b.w + 0.5, 0.26, b.d + 0.5, 0.30, 0.31, 0.35);
        box(b.x0 + 1.1, roofY + 0.8, b.z0 + 1.1, 0.7, 1.6, 0.7, 0.42, 0.25, 0.19);
        box(b.x0 + 1.1, roofY + 1.64, b.z0 + 1.1, 0.92, 0.14, 0.92, 0.3, 0.28, 0.26);
        Mat4.fromTranslationRotationScale(model, cx, roofY + 0.5, cz, spin * 0.8, 1.9, 0.14, 0.45);
        this.drawMesh(this.cubeMesh, ...BRASS);
        Mat4.fromTranslationRotationScale(model, cx, roofY + 0.5, cz, spin * 0.8 + Math.PI / 2, 1.9, 0.14, 0.45);
        this.drawMesh(this.cubeMesh, ...BRASS);
      } else if (b.type === 2) {
        const sr = 0.31;
        const sg = 0.33;
        const sb2 = 0.39;
        box(cx, roofY, cz, b.w + 0.6, 0.24, b.d + 0.5, sr, sg, sb2);
        box(cx, roofY + 0.22, cz, b.w * 0.78, 0.24, b.d + 0.3, sr * 1.07, sg * 1.07, sb2 * 1.07);
        box(cx, roofY + 0.42, cz, b.w * 0.52, 0.22, b.d + 0.1, sr * 1.14, sg * 1.14, sb2 * 1.14);
        box(cx, roofY + 0.6, cz, b.w * 0.26, 0.2, b.d - 0.1, sr * 1.2, sg * 1.2, sb2 * 1.2);
      } else if (b.type === 3) {
        const rr = 0.36 * tintMul;
        const rg = 0.30 * tintMul;
        const rb = 0.40 * tintMul;
        box(cx, roofY, cz, b.w + 0.7, 0.3, b.d + 0.7, rr, rg, rb);
        box(cx, roofY + 0.32, cz, b.w * 0.7, 0.32, b.d * 0.7, rr * 1.08, rg * 1.08, rb * 1.08);
        box(cx, roofY + 0.66, cz, b.w * 0.42, 0.32, b.d * 0.42, rr * 1.15, rg * 1.15, rb * 1.15);
        box(cx, roofY + 0.98, cz, b.w * 0.18, 0.28, b.d * 0.18, rr * 1.22, rg * 1.22, rb * 1.22);
        cyl(b.x0 + b.w - 1.1, roofY + 0.7, b.z0 + 1.1, 0.42, 1.1, 0.42, 0.25, 0.19);
      } else {
        box(cx, roofY, cz, b.w + 0.4, 0.22, b.d + 0.4, 0.37, 0.34, 0.28);
        box(cx, roofY + 0.24, b.z0 + 0.4, b.w + 0.4, 0.26, 0.2, ...TIMBER);
        box(cx, roofY + 0.24, b.z0 + b.d - 0.4, b.w + 0.4, 0.26, 0.2, ...TIMBER);
        box(b.x0 + 0.4, roofY + 0.24, cz, 0.2, 0.26, b.d + 0.4, ...TIMBER);
        box(b.x0 + b.w - 0.4, roofY + 0.24, cz, 0.2, 0.26, b.d + 0.4, ...TIMBER);
        // awning over the shop door with two posts
        const ax = doorMidX + dnx * 0.95;
        const az = doorMidZ + dnz * 0.95;
        box(ax, 2.28, az, doorOnZ ? 3.0 : 1.5, 0.1, doorOnZ ? 1.5 : 3.0, 0.56, 0.30, 0.24);
        for (const side of [-1, 1]) {
          const px = doorOnZ ? doorMidX + side * 1.35 : doorMidX + dnx * 1.55;
          const pz = doorOnZ ? doorMidZ + dnz * 1.55 : doorMidZ + side * 1.35;
          cyl(px, 0, pz, 0.1, 2.26, ...TIMBER);
        }
      }

      // interior furnishings
      for (const p of b.props) {
        if (p.kind === 0) {
          Mat4.fromTranslationRotationScale(model, p.x, 0.26, p.z, 0, 0.95, 0.52, 0.95);
          this.drawMesh(this.cubeMesh, 0.36, 0.25, 0.15);
        } else {
          cyl(p.x, 0, p.z, 0.62, 1.1, 0.58, 0.37, 0.24);
          Mat4.fromTranslationRotationScale(model, p.x, 1.16, p.z, 0, 0.3, 0.3, 0.3);
          this.drawMesh(this.sphereMesh, ...BRASS);
        }
      }

      // yard clutter: barrels and crates against the walls
      const yardHash = cellHash01(b.x0, b.z0);
      if (yardHash > 0.3) {
        const bx = b.x0 + b.w + 0.45;
        const bz = b.z0 + 0.7;
        cyl(bx, 0, bz, 0.55, 0.72, 0.38, 0.27, 0.17);
        cyl(bx, 0.3, bz, 0.58, 0.07, ...BRASS);
      }
      if (yardHash > 0.55) {
        box(b.x0 - 0.5, 0.3, b.z0 + b.d - 0.8, 0.62, 0.62, 0.62, 0.42, 0.31, 0.19);
      }
      if (yardHash > 0.8) {
        const bx = b.x0 + b.w + 0.45;
        cyl(bx, 0, b.z0 + 1.65, 0.5, 0.6, 0.38, 0.27, 0.17);
      }
    }

    this.drawTowerAndLamps(spin);
  }

  private drawTowerAndLamps(spin: number): void {
    const f = this.features;
    if (!f) return;
    if (this.sphereVisible(0, 4, 0, 9)) {
      if (this.towerModel) {
        Mat4.fromTranslationRotationScale(this.model, 0, 0, 0, 0, 1, 1, 1);
        for (const part of this.towerModel) {
          const [r, g, bl] = this.propColor(part.group);
          this.drawMesh(part.mesh, r, g, bl, this.model);
        }
        // spinning brass gear mounted at the belfry
        for (const rot of [spin * 0.5, spin * 0.5 + Math.PI / 2]) {
          Mat4.fromTranslationRotationScale(this.model, 0, 5.0, 0, rot, 3.4, 0.16, 0.7);
          this.drawMesh(this.cubeMesh, 0.62, 0.48, 0.28);
        }
      } else {
        Mat4.fromTranslationRotationScale(this.model, 0, 0, 0, 0, 2.9, 4.6, 2.9);
        this.drawMesh(this.cylinderMesh, 0.30, 0.28, 0.26);
        Mat4.fromTranslationRotationScale(this.model, 0, 4.4, 0, 0, 3.2, 0.3, 3.2);
        this.drawMesh(this.cylinderMesh, 0.69, 0.55, 0.34);
        Mat4.fromTranslationRotationScale(this.model, 0, 4.95, 0, spin * 0.5, 3.9, 0.18, 0.8);
        this.drawMesh(this.cubeMesh, 0.62, 0.48, 0.28);
        Mat4.fromTranslationRotationScale(this.model, 0, 4.95, 0, spin * 0.5 + Math.PI / 2, 3.9, 0.18, 0.8);
        this.drawMesh(this.cubeMesh, 0.62, 0.48, 0.28);
        Mat4.fromTranslationRotationScale(this.model, 0, 5.75, 0, 0, 1.7, 1.7, 1.7);
        this.drawMesh(this.sphereMesh, 0.76, 0.60, 0.36);
      }
    }

    for (const lamp of f.lamps) {
      if (!this.sphereVisible(lamp.x, 1.7, lamp.z, 3.6)) continue;
      if (this.lampModel) {
        Mat4.fromTranslationRotationScale(this.model, lamp.x, 0, lamp.z, 0, 1, 1, 1);
        for (const part of this.lampModel) {
          const [r, g, bl] = this.propColor(part.group);
          this.drawMesh(part.mesh, r, g, bl, this.model);
        }
      } else {
        Mat4.fromTranslationRotationScale(this.model, lamp.x, 0, lamp.z, 0, 0.15, 2.15, 0.15);
        this.drawMesh(this.cylinderMesh, 0.18, 0.16, 0.15);
        Mat4.fromTranslationRotationScale(this.model, lamp.x, 2.3, lamp.z, 0, 0.46, 0.52, 0.46);
        this.drawMesh(this.sphereMesh, 1.0, 0.84, 0.42);
      }
    }
  }

  private bindOutlineProgram(width: number): void {
    const gl = this.gl;
    const u = this.outlineProgram.uniforms;
    gl.useProgram(this.outlineProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform1f(u.uOutlineWidth, width);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform3f(u.uFogColor, FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B);
    gl.uniform1f(u.uFogDensity, FOG_DENSITY);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
  }

  private drawStickmanOutlines(): void {
    if (!this.rig.ready) return;
    const gl = this.gl;
    const u = this.outlineProgram.uniforms;
    const myNetId = clientState.myNetId;
    this.bindOutlineProgram(0.018);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    // Only draw where no character body was rendered — kills hull artifacts at joint seams
    gl.enable(gl.STENCIL_TEST);
    gl.stencilFunc(gl.EQUAL, 0, 0xff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

    for (const entity of clientState.entities.values()) {
      if (myNetId != null && entity.netId === myNetId) continue;
      if (!this.sphereVisible(entity.renderPos.x, entity.renderPos.y + 1.0, entity.renderPos.z, 1.6)) continue;
      const matrices = this.rig.getMatrices(entity.netId);
      if (!matrices) continue;
      for (let i = 0; i < PART_COUNT; i++) {
        gl.uniformMatrix4fv(u.uModel, false, matrices.subarray(i * 16, i * 16 + 16));
        this.bindVao(this.rig.meshes[i].vao);
        gl.drawElements(gl.TRIANGLES, this.rig.meshes[i].indexCount, gl.UNSIGNED_SHORT, 0);
      }
      const style = this.rig.getStyle(entity.netId);
      if (style) {
        this.outlineMode = true;
        this.drawHatPieces(style, matrices);
        this.outlineMode = false;
      }
    }

    gl.disable(gl.STENCIL_TEST);
    gl.cullFace(gl.BACK);
    gl.disable(gl.CULL_FACE);
  }

  private drawWorldOutlines(): void {
    const gl = this.gl;
    this.bindOutlineProgram(0.025);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    this.outlineMode = true;
    this.drawWorldProps();
    this.outlineMode = false;
    gl.cullFace(gl.BACK);
    gl.disable(gl.CULL_FACE);
  }

  private drawSky(now: number): void {
    const gl = this.gl;
    const u = this.skyProgram.uniforms;
    const b = this.camBasis;

    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.useProgram(this.skyProgram.program);
    gl.uniform3f(u.uCamFwd, b[6], b[7], b[8]);
    gl.uniform3f(u.uCamRight, b[0], b[1], b[2]);
    gl.uniform3f(u.uCamUp, b[3], b[4], b[5]);
    gl.uniform1f(u.uTanHalf, Math.tan(FOV_Y_RAD / 2));
    gl.uniform1f(u.uAspect, this.canvas.width / Math.max(1, this.canvas.height));
    gl.uniform1f(u.uTime, now / 1000);
    gl.uniform3f(u.uFogColor, FOG_COLOR_R, FOG_COLOR_G, FOG_COLOR_B);
    this.bindVao(this.skyVao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.depthMask(true);
    gl.enable(gl.DEPTH_TEST);
  }

  private drawFaces(): void {
    if (!this.rig.ready) return;
    const gl = this.gl;
    const u = this.faceProgram.uniforms;
    const myNetId = clientState.myNetId;
    gl.useProgram(this.faceProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
    gl.uniform1i(u.uTexture, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.faceAtlas);
    this.bindVao(this.faceQuadMesh.vao);

    for (const entity of clientState.entities.values()) {
      if (myNetId != null && entity.netId === myNetId) continue;
      if (!this.sphereVisible(entity.renderPos.x, entity.renderPos.y + 1.0, entity.renderPos.z, 1.6)) continue;
      const matrices = this.rig.getMatrices(entity.netId);
      if (!matrices) continue;
      Mat4.fromTranslationRotationScale(
        this.faceLocal,
        FACE_ANCHOR[0], FACE_ANCHOR[1], FACE_ANCHOR[2],
        0,
        FACE_SIZE, FACE_SIZE, 1
      );
      Mat4.multiply(this.faceModel, matrices.subarray(HEAD_INDEX * 16, HEAD_INDEX * 16 + 16), this.faceLocal);
      gl.uniformMatrix4fv(u.uModel, false, this.faceModel);
      const expression = this.rig.getExpression(entity.netId);
      const combo = this.rig.getFaceCombo(entity.netId);
      gl.uniform4f(u.uUvRect, expression / 6, combo / 9, 1 / 6, 1 / 9);
      gl.drawElements(gl.TRIANGLES, this.faceQuadMesh.indexCount, gl.UNSIGNED_SHORT, 0);
    }
  }

  /** Camera-locked right forearm + hand, drawn over a cleared depth buffer like an FPS viewmodel. */
  private drawFirstPersonArm(): void {
    if (!this.rig.ready || clientState.myNetId === null || !clientState.connected) return;
    const gl = this.gl;
    const basis = this.camBasis;

    const cam = this.armCam;
    cam[0] = basis[0]; cam[1] = basis[1]; cam[2] = basis[2]; cam[3] = 0;
    cam[4] = basis[3]; cam[5] = basis[4]; cam[6] = basis[5]; cam[7] = 0;
    cam[8] = -basis[6]; cam[9] = -basis[7]; cam[10] = -basis[8]; cam[11] = 0;
    cam[12] = this.eyeX; cam[13] = this.eyeY; cam[14] = this.eyeZ; cam[15] = 1;

    // Pose: tucked low at the bottom-right edge, forearm angled inward toward
    // screen centre, slightly scaled down — local = T(anchor)*Ry(in)*Rx(tilt)*S
    const sway = Math.sin(this.bobPhase) * 0.008 * this.bobAmp;
    const dip = Math.abs(Math.sin(this.bobPhase * 2)) * 0.012 * this.bobAmp;
    const ax = 0.34 + sway;
    const ay = -0.24 - dip;
    const az = -0.30;
    const tilt = 1.35;
    const inward = -0.38;
    const scale = 0.85;
    const ca = Math.cos(tilt);
    const sa = Math.sin(tilt);
    const cb = Math.cos(inward);
    const sb = Math.sin(inward);
    const local = this.armLocal;
    local[0] = cb * scale; local[1] = 0; local[2] = -sb * scale; local[3] = 0;
    local[4] = sb * sa * scale; local[5] = ca * scale; local[6] = cb * sa * scale; local[7] = 0;
    local[8] = sb * ca * scale; local[9] = -sa * scale; local[10] = cb * ca * scale; local[11] = 0;
    const [px, py, pz] = FOREARM_R_PIVOT;
    local[12] = ax - (local[0] * px + local[4] * py + local[8] * pz);
    local[13] = ay - (local[1] * px + local[5] * py + local[9] * pz);
    local[14] = az - (local[2] * px + local[6] * py + local[10] * pz);
    local[15] = 1;
    Mat4.multiply(this.armModel, cam, local);

    const self = clientState.entities.get(clientState.myNetId);
    const colHex = self?.baseColorHex ?? 0x5a7fb0;
    const r = (((colHex >> 16) & 255) / 255) * 0.95;
    const g = (((colHex >> 8) & 255) / 255) * 0.95;
    const b = ((colHex & 255) / 255) * 0.95;

    gl.clear(gl.DEPTH_BUFFER_BIT);
    this.bindSolidProgram();
    this.drawMesh(this.rig.meshes[FOREARM_R_INDEX], r, g, b, this.armModel);
    this.drawMesh(this.rig.meshes[HAND_R_INDEX], r, g, b, this.armModel);

    this.bindOutlineProgram(0.012);
    const u = this.outlineProgram.uniforms;
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    gl.uniformMatrix4fv(u.uModel, false, this.armModel);
    for (const index of [FOREARM_R_INDEX, HAND_R_INDEX]) {
      this.bindVao(this.rig.meshes[index].vao);
      gl.drawElements(gl.TRIANGLES, this.rig.meshes[index].indexCount, gl.UNSIGNED_SHORT, 0);
    }
    gl.cullFace(gl.BACK);
    gl.disable(gl.CULL_FACE);
  }

  private drawRings(now: number): void {
    const gl = this.gl;
    const u = this.ringProgram.uniforms;
    gl.useProgram(this.ringProgram.program);
    gl.uniformMatrix4fv(u.uViewProj, false, this.viewProj);
    gl.uniform1f(u.uTime, now / 1000);
    gl.uniform3f(u.uRingColor, 1.0, 0.82, 0.45);
    gl.uniform3f(u.uCameraPos, this.eyeX, this.eyeY, this.eyeZ);
    gl.uniform1f(u.uCurve, WORLD_CURVE);
    this.bindVao(this.quadMesh.vao);
    gl.depthMask(false);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(-2.0, -2.0);

    for (const entity of clientState.entities.values()) {
      if (entity.audioEnergy <= AUDIO_RING_MIN_ENERGY) continue;
      const diameter = 3.0 + entity.audioEnergy * 4.0;
      if (!this.sphereVisible(entity.renderPos.x, entity.renderPos.y, entity.renderPos.z, diameter * 0.75)) continue;
      Mat4.fromTranslationRotationScale(
        this.model,
        entity.renderPos.x, entity.renderPos.y + 0.02, entity.renderPos.z,
        0,
        diameter, 1, diameter
      );
      gl.uniformMatrix4fv(u.uModel, false, this.model);
      gl.uniform1f(u.uEnergy, entity.audioEnergy);
      gl.drawElements(gl.TRIANGLES, this.quadMesh.indexCount, gl.UNSIGNED_SHORT, 0);
    }

    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(true);
  }

}
