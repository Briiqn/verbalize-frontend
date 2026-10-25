// User-adjustable settings shared between the ESC menu, input, and audio.
// Kept deliberately tiny — read live by consumers, with a sink hook for volume
// so a change applies to the already-running audio graph immediately.
class Settings {
  masterVolume = 1;      // 0..1 scales all spatial audio
  mouseSensitivity = 1;  // multiplier on the base look sensitivity
  private volumeSink: ((v: number) => void) | null = null;

  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    this.volumeSink?.(this.masterVolume);
  }

  /** The audio engine registers here so volume changes reach the master gain. */
  onVolume(sink: (v: number) => void): void {
    this.volumeSink = sink;
    sink(this.masterVolume);
  }
}

export const settings = new Settings();
