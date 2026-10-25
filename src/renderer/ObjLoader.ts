export interface ObjPart {
  name: string;
  vertices: Float32Array;
  indices: Uint16Array;
}

export function parseObj(text: string): ObjPart[] {
  const positions: number[] = [];
  const normals: number[] = [];
  const parts: ObjPart[] = [];

  let name = 'default';
  let keyToIndex = new Map<string, number>();
  let vertices: number[] = [];
  let indices: number[] = [];

  const flush = (): void => {
    if (indices.length > 0) {
      parts.push({
        name,
        vertices: new Float32Array(vertices),
        indices: new Uint16Array(indices)
      });
    }
    keyToIndex = new Map();
    vertices = [];
    indices = [];
  };

  const resolve = (token: string): number => {
    const existing = keyToIndex.get(token);
    if (existing !== undefined) return existing;
    const comps = token.split('/');
    const vi = (parseInt(comps[0], 10) - 1) * 3;
    const ni = (parseInt(comps[comps.length - 1], 10) - 1) * 3;
    const index = vertices.length / 6;
    vertices.push(
      positions[vi], positions[vi + 1], positions[vi + 2],
      normals[ni], normals[ni + 1], normals[ni + 2]
    );
    keyToIndex.set(token, index);
    return index;
  };

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (line.length === 0 || line[0] === '#') continue;
    const tokens = line.split(/\s+/);
    switch (tokens[0]) {
      case 'v':
        positions.push(Number(tokens[1]), Number(tokens[2]), Number(tokens[3]));
        break;
      case 'vn':
        normals.push(Number(tokens[1]), Number(tokens[2]), Number(tokens[3]));
        break;
      case 'o':
      case 'g':
        flush();
        name = tokens[1] ?? 'default';
        break;
      case 'f': {
        const first = resolve(tokens[1]);
        for (let i = 2; i < tokens.length - 1; i++) {
          indices.push(first, resolve(tokens[i]), resolve(tokens[i + 1]));
        }
        break;
      }
    }
  }
  flush();
  return parts;
}
