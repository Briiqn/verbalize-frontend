import { COMPRESSION_MIN_BYTES, HEADER_RAW, HEADER_DEFLATE_RAW } from '../core/constants';

interface ByteTransform {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<BufferSource>;
}

async function transform(data: Uint8Array, stream: ByteTransform): Promise<Uint8Array> {
  const writer = stream.writable.getWriter();
  const writeDone = writer.write(data as Uint8Array<ArrayBuffer>).then(() => writer.close());
  const reader = stream.readable.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
  }
  await writeDone;
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

function withHeader(header: number, payload: Uint8Array): Uint8Array {
  const framed = new Uint8Array(payload.byteLength + 1);
  framed[0] = header;
  framed.set(payload, 1);
  return framed;
}

export const FrameCodec = {
  async decode(buf: Uint8Array): Promise<Uint8Array> {
    if (buf.byteLength === 0) {
      throw new Error('FrameCodec: empty frame');
    }
    const header = buf[0];
    const body = buf.subarray(1);
    if (header === HEADER_RAW) {
      return body;
    }
    if (header === HEADER_DEFLATE_RAW) {
      return transform(body, new DecompressionStream('deflate-raw'));
    }
    throw new Error(`FrameCodec: unknown frame header 0x${header.toString(16)}`);
  },

  async encode(payload: Uint8Array, isAudioFrame: boolean): Promise<Uint8Array> {
    if (payload.byteLength >= COMPRESSION_MIN_BYTES && !isAudioFrame) {
      const compressed = await transform(payload, new CompressionStream('deflate-raw'));
      return withHeader(HEADER_DEFLATE_RAW, compressed);
    }
    return withHeader(HEADER_RAW, payload);
  }
};
