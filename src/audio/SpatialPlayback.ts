import type { Vec3 } from '../core/types';
import { clientState } from '../core/store';
import { CAMERA_EYE_HEIGHT } from '../core/constants';

const PANNER_REF_DISTANCE = 2.0;
const PANNER_MAX_DISTANCE = 30.0;
const ANALYSER_FFT_SIZE = 1024;
const ENERGY_RMS_GAIN = 2.5;
const ENERGY_DECAY_PER_S = 6.0;
const PLAYING_TAIL_S = 0.05;

interface PlaybackPipeline {
  panner: PannerNode;
  gain: GainNode;
  analyser: AnalyserNode;
  timeDomain: Float32Array<ArrayBuffer>;
  nextStartTime: number;
  decodeChain: Promise<void>;
  fallbackPos: Vec3 | null;
  energy: number;
}

export class SpatialPlayback {
  private readonly pipelines = new Map<number, PlaybackPipeline>();
  private readonly master: GainNode;

  constructor(private readonly ctx: AudioContext) {
    this.master = ctx.createGain();
    this.master.connect(ctx.destination);
  }

  /** 0..1 master volume for all spatial voices (wired to the settings slider). */
  setMasterVolume(v: number): void {
    this.master.gain.value = Math.max(0, Math.min(1, v));
  }

  enqueue(netId: number, bytes: Uint8Array, fallbackPos: Vec3 | null): void {
    if (bytes.byteLength === 0) return;
    const pipeline = this.obtainPipeline(netId);
    if (fallbackPos) pipeline.fallbackPos = fallbackPos;
    const copy = new Uint8Array(bytes.byteLength);
    copy.set(bytes);
    pipeline.decodeChain = pipeline.decodeChain.then(async () => {
      let buffer: AudioBuffer;
      try {
        buffer = await this.ctx.decodeAudioData(copy.buffer);
      } catch {
        return;
      }
      const startAt = Math.max(this.ctx.currentTime, pipeline.nextStartTime);
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(pipeline.gain);
      source.start(startAt);
      pipeline.nextStartTime = startAt + buffer.duration;
    });
  }

  updateFrame(dtS: number): void {
    this.updateListener();
    const now = this.ctx.currentTime;
    for (const [netId, pipeline] of this.pipelines) {
      const entity = clientState.entities.get(netId);
      const pos = entity ? entity.renderPos : pipeline.fallbackPos;
      if (pos) setSpatialPosition(pipeline.panner, pos.x, pos.y, pos.z);

      pipeline.analyser.getFloatTimeDomainData(pipeline.timeDomain);
      const playing = now < pipeline.nextStartTime + PLAYING_TAIL_S;
      const measured = playing
        ? Math.min(1, computeRms(pipeline.timeDomain) * ENERGY_RMS_GAIN)
        : 0;
      pipeline.energy = measured >= pipeline.energy
        ? measured
        : Math.max(measured, pipeline.energy - ENERGY_DECAY_PER_S * dtS);
      if (entity) entity.audioEnergy = pipeline.energy;
    }
  }

  private obtainPipeline(netId: number): PlaybackPipeline {
    const existing = this.pipelines.get(netId);
    if (existing) return existing;

    const panner = new PannerNode(this.ctx, {
      panningModel: 'HRTF',
      distanceModel: 'inverse',
      refDistance: PANNER_REF_DISTANCE,
      maxDistance: PANNER_MAX_DISTANCE
    });
    const gain = this.ctx.createGain();
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = ANALYSER_FFT_SIZE;
    gain.connect(panner);
    gain.connect(analyser);
    panner.connect(this.master);

    const pipeline: PlaybackPipeline = {
      panner,
      gain,
      analyser,
      timeDomain: new Float32Array(analyser.fftSize),
      nextStartTime: 0,
      decodeChain: Promise.resolve(),
      fallbackPos: null,
      energy: 0
    };
    this.pipelines.set(netId, pipeline);
    return pipeline;
  }

  private updateListener(): void {
    const prediction = clientState.localPrediction;
    const px = prediction.predictedPos.x + prediction.visualErrorOffset.x;
    const py = prediction.predictedPos.y + prediction.visualErrorOffset.y + CAMERA_EYE_HEIGHT;
    const pz = prediction.predictedPos.z + prediction.visualErrorOffset.z;
    const yaw = clientState.cameraYawRad;
    const fx = Math.sin(yaw);
    const fz = -Math.cos(yaw);

    const listener = this.ctx.listener;
    if (listener.positionX !== undefined) {
      listener.positionX.value = px;
      listener.positionY.value = py;
      listener.positionZ.value = pz;
      listener.forwardX.value = fx;
      listener.forwardY.value = 0;
      listener.forwardZ.value = fz;
      listener.upX.value = 0;
      listener.upY.value = 1;
      listener.upZ.value = 0;
    } else {
      listener.setPosition(px, py, pz);
      listener.setOrientation(fx, 0, fz, 0, 1, 0);
    }
  }
}

function setSpatialPosition(panner: PannerNode, x: number, y: number, z: number): void {
  if (panner.positionX !== undefined) {
    panner.positionX.value = x;
    panner.positionY.value = y;
    panner.positionZ.value = z;
  } else {
    panner.setPosition(x, y, z);
  }
}

export function computeRms(samples: Float32Array<ArrayBuffer>): number {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i];
    sum += v * v;
  }
  return Math.sqrt(sum / samples.length);
}
