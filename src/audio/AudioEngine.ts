import { eventBus } from '../core/events';
import { clientState } from '../core/store';
import { settings } from '../core/settings';
import { PTT_CHUNK_MS, NPC_INTERACT_RANGE } from '../core/constants';
import { RenderableEntity } from '../core/types';
import { SpatialPlayback, computeRms } from './SpatialPlayback';
import { VoiceActivityDetector } from './VoiceActivation';

const MIC_ANALYSER_FFT_SIZE = 1024;
const NPC_FINALIZE_TIMEOUT_MS = 750;
const GAZE_DOT_MIN = 0.86; // cos(~30°): how centred an NPC must be to be "looked at"
const GAZE_HOLD_MS = 1500;  // keep listening this long after your gaze drifts off the NPC
// Silence after you finish speaking (on top of the VAD's ~0.9s hangover) before the
// villager takes their turn and replies — ~3s of quiet ends your sentence.
const NPC_TURN_SILENCE_MS = 2200;
const KEYSTROKE_MUTE_MS = 250;
const VOICE_BAND_LO_HZ = 85;
const VOICE_BAND_HI_HZ = 3000;
const CLICK_BAND_LO_HZ = 4000;
const CLICK_BAND_HI_HZ = 10000;
const RECORDER_MIME_CANDIDATES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/ogg;codecs=opus',
  'audio/mp4'
];

interface NpcCaptureSession {
  targetNetId: number;
  recorder: MediaRecorder;
  chain: Promise<void>;
  stopping: boolean;
  recorderStopped: boolean;
  finalChunk: Uint8Array | null;
  finalized: boolean;
  finalizeTimeout: number | undefined;
}

function pickRecorderMimeType(): string | null {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const candidate of RECORDER_MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(candidate)) return candidate;
  }
  return null;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private micAnalyser: AnalyserNode | null = null;
  private micTimeDomain: Float32Array<ArrayBuffer> = new Float32Array(MIC_ANALYSER_FFT_SIZE);
  private playback: SpatialPlayback | null = null;

  private voiceSeq = 0;
  private proximityRecorder: MediaRecorder | null = null;
  private proximityChain: Promise<void> = Promise.resolve();
  private npcSession: NpcCaptureSession | null = null;
  private readonly vad = new VoiceActivityDetector();
  private autoNpcTalkId: number | null = null;
  private gazeOffSince = 0;
  private npcSpeechSeen = false;
  private npcLastVoiceTs = 0;
  private micFreqData: Uint8Array<ArrayBuffer> = new Uint8Array(MIC_ANALYSER_FFT_SIZE / 2);
  private readonly dbAmplitudeTable = new Float32Array(256);
  private voiceBinLo = 0;
  private voiceBinHi = 0;
  private clickBinLo = 0;
  private clickBinHi = 0;
  private lastInputDeviceTs = -1e9;
  private readonly onInputDeviceEvent = (e: Event): void => {
    if (e instanceof KeyboardEvent && e.repeat) return;
    this.lastInputDeviceTs = performance.now();
  };

  private rafHandle = 0;
  private lastFrameTs = 0;
  private readonly unsubscribers: Array<() => void> = [];

  async init(): Promise<void> {
    if (this.ctx) return;
    const ctx = new AudioContext();
    this.ctx = ctx;
    if (ctx.state === 'suspended') await ctx.resume();

    this.micStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true }
    });
    const micSource = ctx.createMediaStreamSource(this.micStream);
    this.micAnalyser = ctx.createAnalyser();
    this.micAnalyser.fftSize = MIC_ANALYSER_FFT_SIZE;
    this.micTimeDomain = new Float32Array(this.micAnalyser.fftSize);
    this.micFreqData = new Uint8Array(this.micAnalyser.frequencyBinCount);
    micSource.connect(this.micAnalyser);

    const binHz = ctx.sampleRate / MIC_ANALYSER_FFT_SIZE;
    const lastBin = this.micAnalyser.frequencyBinCount - 1;
    this.voiceBinLo = Math.min(lastBin, Math.max(1, Math.ceil(VOICE_BAND_LO_HZ / binHz)));
    this.voiceBinHi = Math.min(lastBin, Math.floor(VOICE_BAND_HI_HZ / binHz));
    this.clickBinLo = Math.min(lastBin, Math.ceil(CLICK_BAND_LO_HZ / binHz));
    this.clickBinHi = Math.min(lastBin, Math.floor(CLICK_BAND_HI_HZ / binHz));
    const minDb = this.micAnalyser.minDecibels;
    const spanDb = this.micAnalyser.maxDecibels - minDb;
    for (let i = 0; i < 256; i++) {
      this.dbAmplitudeTable[i] = 10 ** ((minDb + (i / 255) * spanDb) / 20);
    }

    window.addEventListener('keydown', this.onInputDeviceEvent);
    window.addEventListener('keyup', this.onInputDeviceEvent);
    window.addEventListener('mousedown', this.onInputDeviceEvent);
    window.addEventListener('mouseup', this.onInputDeviceEvent);

    this.playback = new SpatialPlayback(ctx);
    settings.onVolume((v) => this.playback?.setMasterVolume(v));
    this.bindEvents();

    this.lastFrameTs = performance.now();
    this.rafHandle = requestAnimationFrame(this.onFrame);
  }

  dispose(): void {
    cancelAnimationFrame(this.rafHandle);
    window.removeEventListener('keydown', this.onInputDeviceEvent);
    window.removeEventListener('keyup', this.onInputDeviceEvent);
    window.removeEventListener('mousedown', this.onInputDeviceEvent);
    window.removeEventListener('mouseup', this.onInputDeviceEvent);
    for (const unsubscribe of this.unsubscribers) unsubscribe();
    this.unsubscribers.length = 0;
    this.stopProximityCapture();
    if (this.npcSession) this.stopNpcCapture(this.npcSession.targetNetId);
    if (this.micStream) {
      for (const track of this.micStream.getTracks()) track.stop();
      this.micStream = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.playback = null;
    this.micAnalyser = null;
  }

  private bindEvents(): void {
    this.unsubscribers.push(
      eventBus.on('PTT_PROXIMITY_START', () => this.startProximityCapture()),
      eventBus.on('PTT_PROXIMITY_STOP', () => this.stopProximityCapture()),
      eventBus.on('PTT_NPC_START', ({ npcNetId }) => this.startNpcCapture(npcNetId)),
      eventBus.on('PTT_NPC_STOP', ({ npcNetId }) => this.stopNpcCapture(npcNetId)),
      eventBus.on('VOICE_RELAY', (payload) => {
        if (payload.speakerNetId === clientState.myNetId) return;
        this.playback?.enqueue(payload.speakerNetId, payload.opusChunk, {
          x: payload.originXMm / 1000,
          y: 0,
          z: payload.originZMm / 1000
        });
      }),
      eventBus.on('NPC_STREAM_CHUNK', (payload) => {
        if (payload.audioChunk.byteLength === 0) return;
        this.playback?.enqueue(payload.npcNetId, payload.audioChunk, null);
      })
    );
  }

  private readonly onFrame = (ts: number): void => {
    const dtS = Math.min(0.1, Math.max(0, (ts - this.lastFrameTs) / 1000));
    this.lastFrameTs = ts;

    if (this.micAnalyser) {
      this.micAnalyser.getFloatTimeDomainData(this.micTimeDomain);
      const rms = computeRms(this.micTimeDomain);
      clientState.micEnergyByte = Math.min(255, Math.floor(rms * 255));
      const keystrokeRecent = ts - this.lastInputDeviceTs < KEYSTROKE_MUTE_MS;
      const speaking = this.vad.update(rms, this.computeVoicedRatio(), keystrokeRecent, dtS * 1000);
      this.updateGazeNpcTalk();
      this.updateNpcTurnTaking(speaking, ts);
    }
    this.playback?.updateFrame(dtS);

    this.rafHandle = requestAnimationFrame(this.onFrame);
  };

  private computeVoicedRatio(): number {
    const analyser = this.micAnalyser;
    if (!analyser) return 0;
    analyser.getByteFrequencyData(this.micFreqData);
    let voice = 0;
    for (let i = this.voiceBinLo; i <= this.voiceBinHi; i++) {
      voice += this.dbAmplitudeTable[this.micFreqData[i]];
    }
    let click = 0;
    for (let i = this.clickBinLo; i <= this.clickBinHi; i++) {
      click += this.dbAmplitudeTable[this.micFreqData[i]];
    }
    const voiceDensity = voice / Math.max(1, this.voiceBinHi - this.voiceBinLo + 1);
    const clickDensity = click / Math.max(1, this.clickBinHi - this.clickBinLo + 1);
    return voiceDensity / (voiceDensity + clickDensity + 1e-12);
  }

  private npcDistance2(entity: RenderableEntity): number {
    const me = clientState.localPrediction.predictedPos;
    const dx = entity.renderPos.x - me.x;
    const dz = entity.renderPos.z - me.z;
    return dx * dx + dz * dz;
  }

  /** The NPC the player's camera is aimed at within talking range (highest gaze alignment). */
  private gazedNpcNetId(): number | null {
    const me = clientState.localPrediction.predictedPos;
    const yaw = clientState.cameraYawRad;
    const cosP = Math.cos(clientState.cameraPitchRad);
    const fx = Math.sin(yaw) * cosP;
    const fz = -Math.cos(yaw) * cosP;
    const fh = Math.hypot(fx, fz) || 1;
    const nx = fx / fh;
    const nz = fz / fh;
    const rangeSq = NPC_INTERACT_RANGE * NPC_INTERACT_RANGE;
    let best: number | null = null;
    let bestDot = GAZE_DOT_MIN; // require the NPC within ~30° of where you look
    for (const entity of clientState.entities.values()) {
      if (entity.type !== 'NPC') continue;
      const dx = entity.renderPos.x - me.x;
      const dz = entity.renderPos.z - me.z;
      const d2 = dx * dx + dz * dz;
      if (d2 > rangeSq) continue;
      const dist = Math.sqrt(d2) || 1;
      const dot = (dx / dist) * nx + (dz / dist) * nz;
      if (dot > bestDot) {
        bestDot = dot;
        best = entity.netId;
      }
    }
    return best;
  }

  // Looking at a nearby villager opens their ear (starts a listening session); looking
  // away closes it. No voice-activity gate — the server only answers if you actually spoke.
  // Turn-taking for gaze-driven listening: once you've spoken, a few seconds of
  // silence ends your turn — finalize the utterance (the villager replies) and
  // immediately keep listening for whatever you say next (while still gazing).
  private updateNpcTurnTaking(speaking: boolean, ts: number): void {
    const session = this.npcSession;
    if (!session || session.stopping || this.autoNpcTalkId !== session.targetNetId) {
      this.npcSpeechSeen = false;
      return;
    }
    if (speaking) {
      this.npcSpeechSeen = true;
      this.npcLastVoiceTs = ts;
      return;
    }
    if (this.npcSpeechSeen && ts - this.npcLastVoiceTs >= NPC_TURN_SILENCE_MS) {
      this.npcSpeechSeen = false;
      const npcId = session.targetNetId;
      this.stopNpcCapture(npcId); // finalize + send audio → villager transcribes and replies
      if (this.autoNpcTalkId === npcId) this.startNpcCapture(npcId); // re-arm for your next sentence
    }
  }

  private updateGazeNpcTalk(): void {
    if (this.proximityRecorder !== null || clientState.myNetId === null) return;
    const target = this.gazedNpcNetId();
    const now = performance.now();
    if (this.autoNpcTalkId !== null) {
      const id = this.autoNpcTalkId;
      const sessionLost = this.npcSession === null || this.npcSession.targetNetId !== id;
      if (sessionLost) { this.autoNpcTalkId = null; this.gazeOffSince = 0; return; }
      if (target === id) { this.gazeOffSince = 0; return; } // still looking — keep listening
      // gaze drifted off; hold the session open briefly so a quick glance away mid-sentence
      // (or a moving villager) doesn't truncate the transcript
      if (this.gazeOffSince === 0) this.gazeOffSince = now;
      if (now - this.gazeOffSince >= GAZE_HOLD_MS) {
        this.autoNpcTalkId = null;
        this.gazeOffSince = 0;
        eventBus.emit('PTT_NPC_STOP', { npcNetId: id });
      }
      return;
    }
    if (target !== null && this.npcSession === null) {
      this.autoNpcTalkId = target;
      this.gazeOffSince = 0;
      eventBus.emit('PTT_NPC_START', { npcNetId: target });
    }
  }

  private createRecorder(): MediaRecorder | null {
    if (!this.micStream) return null;
    const mimeType = pickRecorderMimeType();
    return mimeType
      ? new MediaRecorder(this.micStream, { mimeType })
      : new MediaRecorder(this.micStream);
  }

  private startProximityCapture(): void {
    if (this.proximityRecorder) return;
    const recorder = this.createRecorder();
    if (!recorder) return;

    recorder.ondataavailable = (event) => {
      const blob = event.data;
      if (blob.size === 0) return;
      this.proximityChain = this.proximityChain.then(async () => {
        const bytes = new Uint8Array(await blob.arrayBuffer());
        eventBus.emit('SEND_VOICE_CHUNK', { chunk: bytes, seq: this.voiceSeq++ });
      });
    };
    recorder.start(PTT_CHUNK_MS);
    this.proximityRecorder = recorder;
  }

  private stopProximityCapture(): void {
    const recorder = this.proximityRecorder;
    this.proximityRecorder = null;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
  }

  private startNpcCapture(npcNetId: number): void {
    if (this.npcSession) this.stopNpcCapture(this.npcSession.targetNetId);
    const recorder = this.createRecorder();
    if (!recorder) return;

    const session: NpcCaptureSession = {
      targetNetId: npcNetId,
      recorder,
      chain: Promise.resolve(),
      stopping: false,
      recorderStopped: false,
      finalChunk: null,
      finalized: false,
      finalizeTimeout: undefined
    };

    // Capture the raw mic audio and stream it to the server, which transcribes it.
    // (No browser SpeechRecognition — it was unreliable and made NPCs hear "mumbling".)
    recorder.ondataavailable = (event) => {
      const blob = event.data;
      const isFlushChunk = session.stopping;
      session.chain = session.chain.then(async () => {
        if (blob.size === 0) return;
        const bytes = new Uint8Array(await blob.arrayBuffer());
        if (isFlushChunk) {
          if (session.finalChunk) this.emitNpcChunk(session, session.finalChunk, false);
          session.finalChunk = bytes;
        } else {
          this.emitNpcChunk(session, bytes, false);
        }
      });
    };
    recorder.onstop = () => {
      session.recorderStopped = true;
      this.tryFinalizeNpcSession(session, false);
    };

    recorder.start(PTT_CHUNK_MS);
    this.npcSession = session;
  }

  private stopNpcCapture(npcNetId: number): void {
    const session = this.npcSession;
    if (!session || session.targetNetId !== npcNetId) return;
    this.npcSession = null;
    if (session.stopping) return;
    session.stopping = true;

    if (session.recorder.state !== 'inactive') {
      session.recorder.stop();
    } else {
      session.recorderStopped = true;
    }
    session.finalizeTimeout = window.setTimeout(
      () => this.tryFinalizeNpcSession(session, true),
      NPC_FINALIZE_TIMEOUT_MS
    );
    this.tryFinalizeNpcSession(session, false);
  }

  private tryFinalizeNpcSession(session: NpcCaptureSession, force: boolean): void {
    if (session.finalized) return;
    if (!force && !session.recorderStopped) return;
    session.finalized = true;
    if (session.finalizeTimeout !== undefined) {
      window.clearTimeout(session.finalizeTimeout);
      session.finalizeTimeout = undefined;
    }
    session.chain = session.chain.then(() => {
      eventBus.emit('SEND_NPC_AUDIO_INTERACT', {
        targetNetId: session.targetNetId,
        chunk: session.finalChunk ?? new Uint8Array(0),
        transcriptHint: '',
        isFinal: true
      });
    });
  }

  private emitNpcChunk(session: NpcCaptureSession, bytes: Uint8Array, isFinal: boolean): void {
    eventBus.emit('SEND_NPC_AUDIO_INTERACT', {
      targetNetId: session.targetNetId,
      chunk: bytes,
      transcriptHint: '',
      isFinal
    });
  }
}
