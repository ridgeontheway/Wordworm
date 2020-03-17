export interface BaseSpeechService {
  startRecognitionStream(client, request);
  stopRecognitionStream();
}
