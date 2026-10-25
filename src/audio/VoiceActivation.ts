const FLOOR_FALL_RATE = 0.05;
const FLOOR_RISE_RATE_IDLE = 0.01;
const FLOOR_RISE_RATE_ACTIVE = 0.002;
const DEV_RATE_IDLE = 0.05;
const DEV_RATE_ACTIVE = 0.01;
const DEV_MULTIPLIER = 4.0;
const FLOOR_MULTIPLIER = 2.5;
const ABSOLUTE_MIN_RMS = 0.015;
const VOICED_RATIO_MIN = 0.7;
const ONSET_MS = 200;
const HANGOVER_MS = 900;

export class VoiceActivityDetector {
  private noiseFloor = 0.004;
  private noiseDev = 0.002;
  private speechMs = 0;
  private silenceMs = 0;
  private active = false;

  update(rms: number, voicedRatio: number, keystrokeRecent: boolean, dtMs: number): boolean {
    if (rms < this.noiseFloor) {
      this.noiseFloor += (rms - this.noiseFloor) * FLOOR_FALL_RATE;
    } else {
      this.noiseFloor += (rms - this.noiseFloor) * (this.active ? FLOOR_RISE_RATE_ACTIVE : FLOOR_RISE_RATE_IDLE);
    }
    const dev = Math.abs(rms - this.noiseFloor);
    this.noiseDev += (dev - this.noiseDev) * (this.active ? DEV_RATE_ACTIVE : DEV_RATE_IDLE);

    const threshold = Math.max(
      this.noiseFloor + DEV_MULTIPLIER * this.noiseDev,
      this.noiseFloor * FLOOR_MULTIPLIER,
      ABSOLUTE_MIN_RMS
    );
    const loud = rms > threshold;

    if (!this.active) {
      // Onset requires sustained loudness that is voice-band dominant and not coincident
      // with a key/mouse press transient; staying active is governed by loudness alone.
      const speechFrame = loud && voicedRatio >= VOICED_RATIO_MIN && !keystrokeRecent;
      if (speechFrame) this.speechMs += dtMs;
      else this.speechMs = Math.max(0, this.speechMs - dtMs * 2);
      if (this.speechMs >= ONSET_MS) {
        this.active = true;
        this.silenceMs = 0;
      }
    } else {
      if (loud) this.silenceMs = 0;
      else this.silenceMs += dtMs;
      if (this.silenceMs >= HANGOVER_MS) {
        this.active = false;
        this.speechMs = 0;
      }
    }
    return this.active;
  }
}
