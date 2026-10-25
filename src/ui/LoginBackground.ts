// Volumetric login backdrop, ported to WebGL2 from:
//   "Steampunk Orb [340]" by Jaenam — https://www.shadertoy.com/view/WXfcWN
//   via https://www.shadertoy.com/view/t3fcW7

const VS = `#version 300 es
void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)) * 2.0 - 1.0;
  gl_Position = vec4(pos, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
out vec4 fragColor;

mat2 R(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

void main() {
  vec2 I = gl_FragCoord.xy;
  vec2 r = iResolution;
  vec4 O = vec4(0.0);
  float d = 0.0;
  float s = 0.0;
  float w;
  float l;
  float t = iTime;
  vec3 p;
  for (float i = 1.0; i < 140.0; ++i) {
    p = vec3((I - r / 2.0) / r.y * d, d - 0.5);
    p.xy *= R(d * 0.1);
    p.yz *= R(t * 0.1);
    p.xz *= R(t * 0.1);
    w = 7.0;
    for (int j = 0; j < 5; j++) {
      p = sin(p * 1.3 + sin(t * 0.1123) * 0.7853981634);
      l = (1.3 + 0.3 * sin(t * 0.3)) / (dot(p, p) + 1e-4);
      p *= l;
      w *= l;
    }
    s = length(p.xz) / w;
    d += 0.95 * abs(s) + 5e-4;
    O += exp(-0.05 * d) * (sin(d * 0.26 + vec4(1, 2, 3, 1)) * 0.5 + 0.5) * (0.1 / abs(s + 1e-6));
    if (d > 1e5) break;
  }
  fragColor = 1.0 - exp(-O / 5e3);
}`;

export class LoginBackground {
  private readonly canvas: HTMLCanvasElement;
  private readonly gl: WebGL2RenderingContext | null;
  private program: WebGLProgram | null = null;
  private timeLoc: WebGLUniformLocation | null = null;
  private resLoc: WebGLUniformLocation | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private running = false;
  private readonly startMs = performance.now();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', { antialias: false, depth: false, stencil: false });
    const gl = this.gl;
    if (!gl) return;
    const compile = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('[loginbg] shader error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[loginbg] link error:', gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;
    this.timeLoc = gl.getUniformLocation(program, 'iTime');
    this.resLoc = gl.getUniformLocation(program, 'iResolution');
    this.vao = gl.createVertexArray();
  }

  start(): void {
    if (this.running || !this.gl || !this.program) return;
    this.running = true;
    const frame = () => {
      if (!this.running) return;
      this.render();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  stop(): void {
    this.running = false;
  }

  private render(): void {
    const gl = this.gl;
    if (!gl || !this.program) return;
    // Half-resolution: the raymarch is heavy and the backdrop sits behind a panel
    const scale = 0.5 * Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(2, Math.floor(this.canvas.clientWidth * scale));
    const height = Math.max(2, Math.floor(this.canvas.clientHeight * scale));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.useProgram(this.program);
    gl.uniform1f(this.timeLoc, (performance.now() - this.startMs) / 1000);
    gl.uniform2f(this.resLoc, width, height);
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
