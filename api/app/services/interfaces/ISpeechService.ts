import { BaseSpeechService } from "./base/BaseSpeechService";

export interface ISpeechService extends BaseSpeechService {
  // Format for receiving data
  receiveData(data: Buffer);
}
