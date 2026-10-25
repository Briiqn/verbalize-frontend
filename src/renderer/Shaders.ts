export interface ShaderProgram {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string,
  uniformNames: string[]
): ShaderProgram {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, 'aPosition');
  gl.bindAttribLocation(program, 1, 'aNormal');
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${log}`);
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  for (const name of uniformNames) {
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

export const GROUND_GRID_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform vec3 uCameraPos;
uniform float uCurve;
uniform vec2 uGroundOffset;
out vec3 vWorldPos;
void main() {
  vec3 world = vec3(aPosition.x + uGroundOffset.x, aPosition.y, aPosition.z + uGroundOffset.y);
  vWorldPos = world;
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * vec4(world, 1.0);
}
`;

export const GROUND_GRID_FS = `#version 300 es
precision highp float;
precision highp int;
in vec3 vWorldPos;
uniform vec3 uCameraPos;
uniform uint uSeedLo;
uniform uint uSeedHi;
uniform vec3 uFogColor;
uniform float uFogDensity;
out vec4 fragColor;

uint hashU32(uint x) {
  x ^= x >> 16;
  x *= 0x7feb352du;
  x ^= x >> 15;
  x *= 0x846ca68bu;
  x ^= x >> 16;
  return x;
}

float cellRand(ivec2 cell) {
  uint h = uint(cell.x) * 0x85ebca6bu ^ uint(cell.y) * 0xc2b2ae35u;
  h = hashU32(h ^ uSeedLo);
  h = hashU32(h ^ uSeedHi);
  return float(h) * (1.0 / 4294967295.0);
}

void main() {
  vec2 p = vWorldPos.xz;
  ivec2 cell = ivec2(floor(p));

  float r = cellRand(cell);
  vec3 grassA = vec3(0.38, 0.35, 0.14);
  vec3 grassB = vec3(0.54, 0.47, 0.19);
  vec3 base = mix(grassA, grassB, r);
  float mottle = cellRand(ivec2(floor(p * 3.0)) + ivec2(917, 211));
  base = mix(base, mix(grassA, grassB, mottle), 0.4);

  vec2 f = fract(p);
  vec2 dist = min(f, 1.0 - f);
  vec2 fw = fwidth(p);
  vec2 lineMask = 1.0 - smoothstep(vec2(0.0), fw * 1.5, dist);
  float line = max(lineMask.x, lineMask.y);
  vec3 color = mix(base, base * 0.74, line * 0.45);

  float d = distance(uCameraPos, vWorldPos);
  float fog = 1.0 - exp(-uFogDensity * d);
  color = mix(color, uFogColor, fog);
  fragColor = vec4(color, 1.0);
}
`;

export const SOLID_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform vec3 uCameraPos;
uniform float uCurve;
out vec3 vWorldPos;
out vec3 vNormal;
void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vWorldPos = world.xyz;
  vNormal = mat3(uModel) * aNormal;
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * world;
}
`;

export const SOLID_FS = `#version 300 es
precision highp float;
in vec3 vWorldPos;
in vec3 vNormal;
uniform vec3 uBaseColor;
uniform vec3 uDirLightDir;
uniform vec3 uDirLightColor;
uniform vec3 uPointLightPos;
uniform vec3 uPointLightColor;
uniform vec3 uAmbient;
uniform vec3 uCameraPos;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uDetail; // 0 = plain, >0 = procedural steampunk panels+rivets (buildings)
out vec4 fragColor;
void main() {
  vec3 n = normalize(vNormal);
  float dirDiff = max(dot(n, -normalize(uDirLightDir)), 0.0);
  vec3 toPoint = uPointLightPos - vWorldPos;
  float pd = length(toPoint);
  float atten = 1.0 / (1.0 + 0.045 * pd + 0.0075 * pd * pd);
  float ptDiff = max(dot(n, toPoint / max(pd, 1e-4)), 0.0) * atten;
  vec3 lit = uBaseColor * (uAmbient + uDirLightColor * dirDiff + uPointLightColor * ptDiff);

  if (uDetail > 0.5) {
    // Tri-planar surface coords from the dominant face axis
    vec3 an = abs(n);
    vec2 uv = (an.y > an.x && an.y > an.z) ? vWorldPos.xz
            : (an.x > an.z) ? vWorldPos.zy : vWorldPos.xy;
    vec2 cell = fract(uv);
    // recessed panel seams on a 1m grid
    vec2 edge = smoothstep(0.0, 0.05, cell) * smoothstep(0.0, 0.05, 1.0 - cell);
    float panel = min(edge.x, edge.y);
    // riveted bolts near each panel corner
    vec2 rc = min(cell, 1.0 - cell);
    float rivet = smoothstep(0.075, 0.045, length(rc));
    // brushed-metal micro streaks
    float micro = 0.92 + 0.08 * sin(uv.x * 11.0) * cos(uv.y * 8.3);
    lit *= mix(0.68, 1.03, panel) * micro;
    lit += vec3(0.26, 0.21, 0.12) * rivet;
  }

  float d = distance(uCameraPos, vWorldPos);
  float fog = 1.0 - exp(-uFogDensity * d);
  fragColor = vec4(mix(lit, uFogColor, fog), 1.0);
}
`;

// Instanced, camera-facing soft smoke puffs. Per-instance: center, scale, alpha.
export const SMOKE_VS = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;   // [-0.5,0.5] quad corner
layout(location = 1) in vec3 aCenter;   // per-instance world position
layout(location = 2) in float aScale;   // per-instance size
layout(location = 3) in float aAlpha;   // per-instance opacity
uniform mat4 uViewProj;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCameraPos;
uniform float uCurve;
uniform float uFogDensity;
out vec2 vCorner;
out float vAlpha;
out float vFog;
void main() {
  vCorner = aCorner * 2.0;
  vAlpha = aAlpha;
  vec3 world = aCenter + (uCamRight * aCorner.x + uCamUp * aCorner.y) * aScale;
  float dist = length(aCenter - uCameraPos);
  vFog = 1.0 - exp(-dist * uFogDensity);
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * vec4(world, 1.0);
}
`;

export const SMOKE_FS = `#version 300 es
precision highp float;
in vec2 vCorner;
in float vAlpha;
in float vFog;
uniform vec3 uSmokeColor;
uniform vec3 uFogColor;
out vec4 fragColor;
void main() {
  float r = length(vCorner);
  float soft = smoothstep(1.0, 0.2, r);
  float a = soft * vAlpha;
  if (a < 0.004) discard;
  vec3 col = mix(uSmokeColor, uFogColor, vFog * 0.75);
  fragColor = vec4(col, a);
}
`;

export const RING_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform vec3 uCameraPos;
uniform float uCurve;
out vec2 vLocal;
void main() {
  vLocal = aPosition.xz * 2.0;
  vec4 world = uModel * vec4(aPosition, 1.0);
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * world;
}
`;

export const RING_FS = `#version 300 es
precision highp float;
in vec2 vLocal;
uniform float uTime;
uniform float uEnergy;
uniform vec3 uRingColor;
out vec4 fragColor;
void main() {
  float r = length(vLocal);
  if (r > 1.0) discard;
  float speed = 0.6 + uEnergy * 1.2;
  float phase = fract(r * 2.5 - uTime * speed);
  float ring = smoothstep(0.0, 0.12, phase) * (1.0 - smoothstep(0.12, 0.3, phase));
  float edgeFade = 1.0 - smoothstep(0.55, 1.0, r);
  float centerFade = smoothstep(0.03, 0.12, r);
  float alpha = ring * edgeFade * centerFade * clamp(uEnergy * 2.5, 0.0, 1.0);
  fragColor = vec4(uRingColor, alpha);
}
`;

export const BILLBOARD_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform mat4 uModel;
out vec2 vUv;
void main() {
  vUv = vec2(aPosition.x + 0.5, 0.5 - aPosition.z);
  gl_Position = uViewProj * uModel * vec4(aPosition.x, aPosition.z, 0.0, 1.0);
}
`;

export const BILLBOARD_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
out vec4 fragColor;
void main() {
  vec4 texel = texture(uTexture, vUv);
  if (texel.a < 0.01) discard;
  fragColor = texel;
}
`;

export const OUTLINE_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform float uOutlineWidth;
uniform vec3 uCameraPos;
uniform float uCurve;
out vec3 vWorldPos;
void main() {
  vec3 n = normalize(mat3(uModel) * aNormal);
  vec4 world = uModel * vec4(aPosition, 1.0);
  world.xyz += n * uOutlineWidth;
  vWorldPos = world.xyz;
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * world;
}
`;

export const OUTLINE_FS = `#version 300 es
precision highp float;
in vec3 vWorldPos;
uniform vec3 uCameraPos;
uniform vec3 uFogColor;
uniform float uFogDensity;
out vec4 outColor;
void main() {
  float dist = length(vWorldPos - uCameraPos);
  float fog = 1.0 - exp(-dist * uFogDensity);
  outColor = vec4(mix(vec3(0.03, 0.025, 0.02), uFogColor, fog), 1.0);
}
`;

export const FACE_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform mat4 uModel;
uniform vec4 uUvRect;
uniform vec3 uCameraPos;
uniform float uCurve;
out vec2 vUv;
void main() {
  vUv = uUvRect.xy + aNormal.xy * uUvRect.zw;
  vec4 world = uModel * vec4(aPosition, 1.0);
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * world;
}
`;

export const FACE_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
out vec4 outColor;
void main() {
  vec4 c = texture(uTexture, vUv);
  if (c.a < 0.04) discard;
  outColor = c;
}
`;

export const GRASS_VS = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
uniform mat4 uViewProj;
uniform float uTime;
uniform vec3 uCameraPos;
uniform float uCurve;
out vec3 vWorldPos;
out float vColorVar;
void main() {
  vec3 world = aPosition;
  float sway = aNormal.x;
  world.x += sin(uTime * 1.7 + aPosition.x * 0.8 + aPosition.z * 1.3) * 0.07 * sway;
  world.z += cos(uTime * 1.4 + aPosition.z * 0.9 + aPosition.x * 1.1) * 0.05 * sway;
  vWorldPos = world;
  vColorVar = aNormal.y;
  vec2 d = world.xz - uCameraPos.xz;
  world.y -= dot(d, d) * uCurve;
  gl_Position = uViewProj * vec4(world, 1.0);
}
`;

export const GRASS_FS = `#version 300 es
precision highp float;
in vec3 vWorldPos;
in float vColorVar;
uniform vec3 uCameraPos;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
out vec4 fragColor;
void main() {
  vec3 base = mix(uColorA, uColorB, vColorVar);
  float d = distance(uCameraPos, vWorldPos);
  float fog = 1.0 - exp(-uFogDensity * d);
  fragColor = vec4(mix(base, uFogColor, fog), 1.0);
}
`;

export const SKY_VS = `#version 300 es
precision highp float;
out vec2 vNdc;
void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)) * 2.0 - 1.0;
  vNdc = pos;
  gl_Position = vec4(pos, 0.999, 1.0);
}
`;

export const SKY_FS = `#version 300 es
precision highp float;
in vec2 vNdc;
uniform vec3 uCamFwd;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform float uTanHalf;
uniform float uAspect;
uniform float uTime;
uniform vec3 uFogColor;
out vec4 outColor;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(13.7, 7.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(uCamFwd + uCamRight * vNdc.x * uTanHalf * uAspect + uCamUp * vNdc.y * uTanHalf);
  float h = clamp(dir.y, -1.0, 1.0);
  vec3 zenith = vec3(0.295, 0.245, 0.18);
  vec3 sky = mix(uFogColor, zenith, smoothstep(0.0, 0.55, h));

  if (dir.y > 0.01) {
    vec2 p = dir.xz / (dir.y + 0.14) * 1.4;
    p += uTime * vec2(0.016, 0.007);
    float n = fbm(p);
    float drift = fbm(p * 2.6 - uTime * vec2(0.021, 0.004));
    n = n * 0.75 + drift * 0.35;
    float cover = smoothstep(0.42, 0.72, n);
    vec3 cloudDark = vec3(0.235, 0.19, 0.145);
    vec3 cloudLight = vec3(0.58, 0.48, 0.33);
    vec3 cloud = mix(cloudDark, cloudLight, smoothstep(0.55, 0.95, n));
    float horizonFade = smoothstep(0.015, 0.22, dir.y);
    sky = mix(sky, cloud, cover * horizonFade * 0.85);
  }

  float sun = pow(max(dot(dir, normalize(vec3(0.45, 0.4, -0.6))), 0.0), 20.0);
  sky += vec3(0.52, 0.38, 0.18) * sun * 0.4;
  outColor = vec4(sky, 1.0);
}
`;
