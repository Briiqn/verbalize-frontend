interface AmbientSpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface AmbientSpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): AmbientSpeechRecognitionAlternative;
  readonly [index: number]: AmbientSpeechRecognitionAlternative;
}

interface AmbientSpeechRecognitionResultList {
  readonly length: number;
  item(index: number): AmbientSpeechRecognitionResult;
  readonly [index: number]: AmbientSpeechRecognitionResult;
}

interface AmbientSpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: AmbientSpeechRecognitionResultList;
}

interface AmbientSpeechRecognitionErrorEvent {
  readonly error: string;
  readonly message: string;
}

interface AmbientSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: AmbientSpeechRecognitionEvent) => void) | null;
  onerror: ((event: AmbientSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface Window {
  webkitSpeechRecognition?: new () => AmbientSpeechRecognition;
}
