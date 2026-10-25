export interface Mesh {
  vao: WebGLVertexArrayObject;
  indexCount: number;
  indexType?: number; // gl.UNSIGNED_SHORT (default) or gl.UNSIGNED_INT
}

const FLOATS_PER_VERTEX = 6;

// 32-bit index variant for large stamped meshes (e.g. grass > 65535 verts)
export function createMeshFromArrays32(gl: WebGL2RenderingContext, vertices: Float32Array, indices: Uint32Array): Mesh {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error('Failed to create VAO');
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const stride = FLOATS_PER_VERTEX * 4;
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 12);
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return { vao, indexCount: indices.length, indexType: gl.UNSIGNED_INT };
}

function buildMesh(gl: WebGL2RenderingContext, vertices: Float32Array, indices: Uint16Array): Mesh {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error('Failed to create VAO');
  gl.bindVertexArray(vao);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const stride = FLOATS_PER_VERTEX * 4;
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 12);

  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return { vao, indexCount: indices.length };
}

// Unit sphere, radius 0.5, centered at origin
export function createUnitSphere(gl: WebGL2RenderingContext, segments = 12, rings = 8): Mesh {
  const row = segments + 1;
  const vertices = new Float32Array(row * (rings + 1) * FLOATS_PER_VERTEX);
  let v = 0;
  for (let ri = 0; ri <= rings; ri++) {
    const phi = (ri / rings) * Math.PI;
    const y = Math.cos(phi);
    const sr = Math.sin(phi);
    for (let si = 0; si <= segments; si++) {
      const th = (si / segments) * Math.PI * 2;
      const nx = sr * Math.cos(th);
      const nz = sr * Math.sin(th);
      vertices[v++] = nx * 0.5; vertices[v++] = y * 0.5; vertices[v++] = nz * 0.5;
      vertices[v++] = nx; vertices[v++] = y; vertices[v++] = nz;
    }
  }
  const indices = new Uint16Array(rings * segments * 6);
  let idx = 0;
  for (let ri = 0; ri < rings; ri++) {
    for (let si = 0; si < segments; si++) {
      const a = ri * row + si;
      const b = a + row;
      indices[idx++] = a; indices[idx++] = a + 1; indices[idx++] = b + 1;
      indices[idx++] = a; indices[idx++] = b + 1; indices[idx++] = b;
    }
  }
  return buildMesh(gl, vertices, indices);
}

// Unit cone: base radius 0.5 at y=0, apex at y=1
export function createUnitCone(gl: WebGL2RenderingContext, segments = 14): Mesh {
  const slopeLen = Math.sqrt(1 + 0.25);
  const ny = 0.5 / slopeLen;
  const nr = 1 / slopeLen;
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let si = 0; si <= segments; si++) {
    const th = (si / segments) * Math.PI * 2;
    const c = Math.cos(th);
    const s = Math.sin(th);
    vertices.push(c * 0.5, 0, s * 0.5, c * nr, ny, s * nr);
  }
  const apexBase = vertices.length / 6;
  for (let si = 0; si < segments; si++) {
    const th = ((si + 0.5) / segments) * Math.PI * 2;
    vertices.push(0, 1, 0, Math.cos(th) * nr, ny, Math.sin(th) * nr);
  }
  for (let si = 0; si < segments; si++) {
    indices.push(si, apexBase + si, si + 1);
  }
  const capBase = vertices.length / 6;
  vertices.push(0, 0, 0, 0, -1, 0);
  for (let si = 0; si <= segments; si++) {
    const th = (si / segments) * Math.PI * 2;
    vertices.push(Math.cos(th) * 0.5, 0, Math.sin(th) * 0.5, 0, -1, 0);
  }
  for (let si = 0; si < segments; si++) {
    indices.push(capBase, capBase + 1 + si + 1, capBase + 1 + si);
  }
  return buildMesh(gl, new Float32Array(vertices), new Uint16Array(indices));
}

export function createMeshFromArrays(
  gl: WebGL2RenderingContext,
  vertices: Float32Array,
  indices: Uint16Array
): Mesh {
  return buildMesh(gl, vertices, indices);
}

// XY-plane quad facing -Z; UV packed into the normal attribute slot (xy)
export function createFaceQuad(gl: WebGL2RenderingContext): Mesh {
  const vertices = new Float32Array([
    -0.5, 0.5, 0, 0, 0, 0,
    0.5, 0.5, 0, 1, 0, 0,
    0.5, -0.5, 0, 1, 1, 0,
    -0.5, -0.5, 0, 0, 1, 0
  ]);
  const indices = new Uint16Array([0, 2, 1, 0, 3, 2]);
  return buildMesh(gl, vertices, indices);
}

export function createGroundQuad(gl: WebGL2RenderingContext, halfExtent = 256, segments = 96): Mesh {
  const h = halfExtent;
  const row = segments + 1;
  const vertices = new Float32Array(row * row * FLOATS_PER_VERTEX);
  let v = 0;
  for (let zi = 0; zi <= segments; zi++) {
    const z = -h + (zi / segments) * h * 2;
    for (let xi = 0; xi <= segments; xi++) {
      const x = -h + (xi / segments) * h * 2;
      vertices[v++] = x; vertices[v++] = 0; vertices[v++] = z;
      vertices[v++] = 0; vertices[v++] = 1; vertices[v++] = 0;
    }
  }
  const indices = new Uint16Array(segments * segments * 6);
  let idx = 0;
  for (let zi = 0; zi < segments; zi++) {
    for (let xi = 0; xi < segments; xi++) {
      const a = zi * row + xi;
      const b = a + row;
      indices[idx++] = a; indices[idx++] = b; indices[idx++] = b + 1;
      indices[idx++] = a; indices[idx++] = b + 1; indices[idx++] = a + 1;
    }
  }
  return buildMesh(gl, vertices, indices);
}

export function createUnitQuadXZ(gl: WebGL2RenderingContext): Mesh {
  const vertices = new Float32Array([
    -0.5, 0, -0.5, 0, 1, 0,
    -0.5, 0, 0.5, 0, 1, 0,
    0.5, 0, 0.5, 0, 1, 0,
    0.5, 0, -0.5, 0, 1, 0
  ]);
  const indices = new Uint16Array([0, 1, 2, 0, 2, 3, 0, 2, 1, 0, 3, 2]);
  return buildMesh(gl, vertices, indices);
}

export function createUnitCube(gl: WebGL2RenderingContext): Mesh {
  const p = 0.5;
  const faces: Array<{ n: [number, number, number]; v: Array<[number, number, number]> }> = [
    { n: [0, 0, 1], v: [[-p, -p, p], [p, -p, p], [p, p, p], [-p, p, p]] },
    { n: [0, 0, -1], v: [[p, -p, -p], [-p, -p, -p], [-p, p, -p], [p, p, -p]] },
    { n: [1, 0, 0], v: [[p, -p, p], [p, -p, -p], [p, p, -p], [p, p, p]] },
    { n: [-1, 0, 0], v: [[-p, -p, -p], [-p, -p, p], [-p, p, p], [-p, p, -p]] },
    { n: [0, 1, 0], v: [[-p, p, p], [p, p, p], [p, p, -p], [-p, p, -p]] },
    { n: [0, -1, 0], v: [[-p, -p, -p], [p, -p, -p], [p, -p, p], [-p, -p, p]] }
  ];
  const vertices = new Float32Array(24 * FLOATS_PER_VERTEX);
  const indices = new Uint16Array(36);
  let vi = 0;
  let ii = 0;
  let base = 0;
  for (const face of faces) {
    for (const [x, y, z] of face.v) {
      vertices[vi++] = x;
      vertices[vi++] = y;
      vertices[vi++] = z;
      vertices[vi++] = face.n[0];
      vertices[vi++] = face.n[1];
      vertices[vi++] = face.n[2];
    }
    indices[ii++] = base;
    indices[ii++] = base + 1;
    indices[ii++] = base + 2;
    indices[ii++] = base;
    indices[ii++] = base + 2;
    indices[ii++] = base + 3;
    base += 4;
  }
  return buildMesh(gl, vertices, indices);
}

export function createUnitCylinder(gl: WebGL2RenderingContext, segments = 16): Mesh {
  const r = 0.5;
  const verts: number[] = [];
  const idx: number[] = [];

  const sideBase = 0;
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const nx = Math.cos(a);
    const nz = Math.sin(a);
    verts.push(nx * r, 0, nz * r, nx, 0, nz);
    verts.push(nx * r, 1, nz * r, nx, 0, nz);
  }
  for (let i = 0; i < segments; i++) {
    const b = sideBase + i * 2;
    idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
  }

  const topCenter = verts.length / FLOATS_PER_VERTEX;
  verts.push(0, 1, 0, 0, 1, 0);
  const topBase = topCenter + 1;
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    verts.push(Math.cos(a) * r, 1, Math.sin(a) * r, 0, 1, 0);
  }
  for (let i = 0; i < segments; i++) {
    idx.push(topCenter, topBase + i + 1, topBase + i);
  }

  const botCenter = verts.length / FLOATS_PER_VERTEX;
  verts.push(0, 0, 0, 0, -1, 0);
  const botBase = botCenter + 1;
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    verts.push(Math.cos(a) * r, 0, Math.sin(a) * r, 0, -1, 0);
  }
  for (let i = 0; i < segments; i++) {
    idx.push(botCenter, botBase + i, botBase + i + 1);
  }

  return buildMesh(gl, new Float32Array(verts), new Uint16Array(idx));
}
