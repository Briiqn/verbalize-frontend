import { ShaderProgram } from './Shaders';

export interface SmokeEmitter {
  x: number;
  y: number;
  z: number;
  rate: number;   // particles per second
  rise: number;   // base upward velocity (m/s)
  spread: number; // horizontal spawn jitter radius
  size: number;   // starting puff radius
  accum: number;  // fractional spawn accumulator (mutated)
}

const FLOATS_PER_INSTANCE = 5; // cx, cy, cz, scale, alpha

// CPU particle pool rendered as instanced camera-facing quads. Soft, slow-rising
// smog puffs that fade in, grow and dissipate — the steampunk haze over the village.
export class SmokeSystem {
  private readonly cap: number;
  private readonly px: Float32Array;
  private readonly py: Float32Array;
  private readonly pz: Float32Array;
  private readonly vx: Float32Array;
  private readonly vy: Float32Array;
  private readonly vz: Float32Array;
  private readonly age: Float32Array;
  private readonly life: Float32Array;
  private readonly s0: Float32Array;
  private readonly s1: Float32Array;
  private readonly instance: Float32Array;
  private count = 0;

  private readonly vao: WebGLVertexArrayObject;
  private readonly instanceVbo: WebGLBuffer;
  private seed = 0x9e3779b9;

  constructor(private readonly gl: WebGL2RenderingContext, cap = 520) {
    this.cap = cap;
    this.px = new Float32Array(cap);
    this.py = new Float32Array(cap);
    this.pz = new Float32Array(cap);
    this.vx = new Float32Array(cap);
    this.vy = new Float32Array(cap);
    this.vz = new Float32Array(cap);
    this.age = new Float32Array(cap);
    this.life = new Float32Array(cap);
    this.s0 = new Float32Array(cap);
    this.s1 = new Float32Array(cap);
    this.instance = new Float32Array(cap * FLOATS_PER_INSTANCE);

    const vao = gl.createVertexArray();
    if (!vao) throw new Error('smoke VAO alloc failed');
    this.vao = vao;
    gl.bindVertexArray(vao);

    // static unit quad (two triangles)
    const quad = new Float32Array([
      -0.5, -0.5, 0.5, -0.5, 0.5, 0.5,
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5
    ]);
    const quadVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const instanceVbo = gl.createBuffer();
    if (!instanceVbo) throw new Error('smoke VBO alloc failed');
    this.instanceVbo = instanceVbo;
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceVbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.instance.byteLength, gl.DYNAMIC_DRAW);
    const stride = FLOATS_PER_INSTANCE * 4;
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 12);
    gl.vertexAttribDivisor(2, 1);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 16);
    gl.vertexAttribDivisor(3, 1);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  private rand(): number {
    // xorshift-ish; just needs cheap jitter, not determinism
    let t = (this.seed += 0x6d2b79f5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  private spawn(e: SmokeEmitter): void {
    if (this.count >= this.cap) return;
    const i = this.count++;
    const a = this.rand() * Math.PI * 2;
    const r = this.rand() * e.spread;
    this.px[i] = e.x + Math.cos(a) * r;
    this.py[i] = e.y + this.rand() * 0.1;
    this.pz[i] = e.z + Math.sin(a) * r;
    this.vx[i] = (this.rand() - 0.5) * 0.3;
    this.vy[i] = e.rise * (0.7 + this.rand() * 0.6);
    this.vz[i] = (this.rand() - 0.5) * 0.3;
    this.age[i] = 0;
    this.life[i] = 2.6 + this.rand() * 2.6;
    this.s0[i] = e.size * (0.7 + this.rand() * 0.6);
    this.s1[i] = this.s0[i] * (2.4 + this.rand() * 1.6);
  }

  /** Advance particles, spawn from nearby emitters, and pack the instance buffer. */
  update(dt: number, emitters: readonly SmokeEmitter[], windX: number, windZ: number,
         camX: number, camZ: number): void {
    const step = Math.min(dt, 0.05);
    // advance live particles, compacting the pool in place
    let w = 0;
    for (let i = 0; i < this.count; i++) {
      const na = this.age[i] + step;
      if (na >= this.life[i]) continue;
      const vy = this.vy[i] * (1 - step * 0.12);
      const nx = this.px[i] + (this.vx[i] + windX) * step;
      const ny = this.py[i] + vy * step;
      const nz = this.pz[i] + (this.vz[i] + windZ) * step;
      this.px[w] = nx; this.py[w] = ny; this.pz[w] = nz;
      this.vx[w] = this.vx[i]; this.vy[w] = vy; this.vz[w] = this.vz[i];
      this.age[w] = na; this.life[w] = this.life[i];
      this.s0[w] = this.s0[i]; this.s1[w] = this.s1[i];
      w++;
    }
    this.count = w;

    // spawn from emitters within view range of the camera
    const RANGE_SQ = 70 * 70;
    for (const e of emitters) {
      const dx = e.x - camX, dz = e.z - camZ;
      if (dx * dx + dz * dz > RANGE_SQ) { e.accum = 0; continue; }
      e.accum += e.rate * step;
      while (e.accum >= 1 && this.count < this.cap) {
        e.accum -= 1;
        this.spawn(e);
      }
    }

    // pack instance data
    const inst = this.instance;
    for (let i = 0; i < this.count; i++) {
      const t = this.age[i] / this.life[i];
      const size = this.s0[i] + (this.s1[i] - this.s0[i]) * t;
      // fade in quickly, ease out over the back half
      const alpha = Math.min(1, t / 0.15) * (1 - t) * 0.72;
      const o = i * FLOATS_PER_INSTANCE;
      inst[o] = this.px[i]; inst[o + 1] = this.py[i]; inst[o + 2] = this.pz[i];
      inst[o + 3] = size; inst[o + 4] = alpha;
    }
  }

  draw(program: ShaderProgram, viewProj: Float32Array,
       camRight: readonly number[], camUp: readonly number[],
       camPos: readonly [number, number, number],
       curve: number, fogDensity: number,
       smoke: readonly [number, number, number], fog: readonly [number, number, number]): void {
    if (this.count === 0) return;
    const gl = this.gl;
    const u = program.uniforms;
    gl.useProgram(program.program);
    gl.uniformMatrix4fv(u.uViewProj, false, viewProj);
    gl.uniform3f(u.uCamRight, camRight[0], camRight[1], camRight[2]);
    gl.uniform3f(u.uCamUp, camUp[0], camUp[1], camUp[2]);
    gl.uniform3f(u.uCameraPos, camPos[0], camPos[1], camPos[2]);
    gl.uniform1f(u.uCurve, curve);
    gl.uniform1f(u.uFogDensity, fogDensity);
    gl.uniform3f(u.uSmokeColor, smoke[0], smoke[1], smoke[2]);
    gl.uniform3f(u.uFogColor, fog[0], fog[1], fog[2]);

    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.instance.subarray(0, this.count * FLOATS_PER_INSTANCE));
    gl.depthMask(false);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, this.count);
    gl.depthMask(true);
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}
