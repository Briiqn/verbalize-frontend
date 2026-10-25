export interface EventMap {
  PTT_PROXIMITY_START: void;
  PTT_PROXIMITY_STOP: void;
  PTT_NPC_START: { npcNetId: number };
  PTT_NPC_STOP: { npcNetId: number };
  SEND_WORLD_INTERACT: { gridX: number; gridY: number; gridZ: number; structureType: number };
  SEND_VOICE_CHUNK: { chunk: Uint8Array; seq: number };
  SEND_NPC_AUDIO_INTERACT: { targetNetId: number; chunk: Uint8Array; transcriptHint: string; isFinal: boolean };
  VOICE_RELAY: { speakerNetId: number; originXMm: number; originZMm: number; opusChunk: Uint8Array; chunkSeq: number };
  NPC_STREAM_CHUNK: { interactionId: string; npcNetId: number; textDelta: string; audioChunk: Uint8Array; chunkIndex: number; isComplete: boolean };
  SOCKET_CONNECTED: { netId: number };
  SOCKET_CLOSED: void;
  SOCKET_REJECTED: { reason: string };
  REPUTATION: { reputation: number; delta: number; reason: string };
  REQUEST_DISCONNECT: void;
  SEND_AVATAR_UPDATE: { hat: number; bodyColorHex: number; eyes: number; mouth: number; hair: number };
}

export type EventKey = keyof EventMap;

type Handler<K extends EventKey> = (payload: EventMap[K]) => void;

export class EventBus {
  private readonly handlers = new Map<EventKey, Set<Handler<EventKey>>>();

  on<K extends EventKey>(key: K, fn: Handler<K>): () => void {
    let set = this.handlers.get(key);
    if (!set) {
      set = new Set();
      this.handlers.set(key, set);
    }
    set.add(fn as Handler<EventKey>);
    return () => set.delete(fn as Handler<EventKey>);
  }

  emit<K extends EventKey>(key: K, payload: EventMap[K]): void {
    const set = this.handlers.get(key);
    if (!set) return;
    for (const fn of set) (fn as Handler<K>)(payload);
  }
}

export const eventBus = new EventBus();
