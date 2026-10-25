import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { clientState } from '../core/store';

// Expression cells in the face atlas (see Stickman.buildFaceAtlas):
// 0 neutral, 1 blink, 2 mouth open/talking, 3 surprised, 4 big smile, 5 frown
const INFERENCE_INTERVAL_MS = 66; // ~15 Hz

export class FaceTracker {
  private landmarker: FaceLandmarker | null = null;
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private timer: number | null = null;
  private lastVideoTime = -1;
  private smoothedRollRad = 0;

  /** Local-only inference: frames never leave the machine; only a 1-byte expression id is networked. */
  async init(): Promise<void> {
    const fileset = await FilesetResolver.forVisionTasks('/mediapipe-wasm');
    this.landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: '/models/face_landmarker.task',
        delegate: 'GPU'
      },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true
    });

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240, facingMode: 'user' }
    });
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.srcObject = this.stream;
    video.style.display = 'none';
    document.body.appendChild(video);
    await video.play();
    this.video = video;

    this.timer = window.setInterval(() => this.infer(), INFERENCE_INTERVAL_MS);
  }

  dispose(): void {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.video?.remove();
    this.video = null;
    this.landmarker?.close();
    this.landmarker = null;
    clientState.faceState = 255;
    clientState.headRollMrad = 0;
  }

  private infer(): void {
    const video = this.video;
    const landmarker = this.landmarker;
    if (!video || !landmarker || video.readyState < 2) return;
    if (video.currentTime === this.lastVideoTime) return;
    this.lastVideoTime = video.currentTime;

    let scores: Map<string, number>;
    try {
      const result = landmarker.detectForVideo(video, performance.now());
      const shapes = result.faceBlendshapes?.[0]?.categories;
      if (!shapes) {
        clientState.faceState = 0;
        clientState.headRollMrad = 0;
        return;
      }
      scores = new Map(shapes.map((c) => [c.categoryName, c.score]));

      // Head roll from the face pose matrix: tilt of the face's X axis vs horizontal.
      // Webcam is a mirror view, so negate to match what an onlooker sees.
      const m = result.facialTransformationMatrixes?.[0]?.data;
      if (m) {
        const roll = -Math.atan2(m[1], m[0]);
        const clamped = Math.max(-0.7, Math.min(0.7, roll));
        this.smoothedRollRad = this.smoothedRollRad * 0.65 + clamped * 0.35;
        clientState.headRollMrad = Math.round(this.smoothedRollRad * 1000);
      }
    } catch {
      return;
    }

    const g = (name: string): number => scores.get(name) ?? 0;
    const blink = (g('eyeBlinkLeft') + g('eyeBlinkRight')) / 2;
    const jawOpen = g('jawOpen');
    const browUp = g('browInnerUp');
    const browDown = (g('browDownLeft') + g('browDownRight')) / 2;
    const eyesWide = (g('eyeWideLeft') + g('eyeWideRight')) / 2;
    const smile = (g('mouthSmileLeft') + g('mouthSmileRight')) / 2;
    const frown = (g('mouthFrownLeft') + g('mouthFrownRight')) / 2;
    const press = (g('mouthPressLeft') + g('mouthPressRight')) / 2;

    clientState.faceState = classify(blink, jawOpen, browUp, browDown, eyesWide, smile, frown, press);
  }
}

function classify(
  blink: number,
  jawOpen: number,
  browUp: number,
  browDown: number,
  eyesWide: number,
  smile: number,
  frown: number,
  press: number
): number {
  if (blink > 0.5) return 1;
  // Angry/frowning: furrowed brows are the reliable signal; the mouthFrown
  // blendshapes barely move on most faces, so they get a low bar and an
  // assist from pressed lips
  if (browDown > 0.3 && smile < 0.25) return 5;
  if (frown > 0.12 || (press > 0.35 && browDown > 0.15)) return 5;
  if (browUp > 0.5 && (eyesWide > 0.25 || jawOpen > 0.2)) return 3;
  if (jawOpen > 0.3) return 2;
  if (smile > 0.4) return 4;
  return 0;
}
