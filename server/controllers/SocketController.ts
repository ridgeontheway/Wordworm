import SpeechToTextService from "../app/services/SpeechToTextService";

class socketController {
  private speechService: SpeechToTextService;

  constructor() {
    this.speechService = new SpeechToTextService();
  }

  startStream(socket: SocketIO.Socket, request) {
    console.log("the stream has started!");
    this.speechService.startRecognitionStream(socket, request);
  }

  onAudioDataReceived(data) {
    this.speechService.receiveData(data);
  }

  endStream() {
    this.speechService.stopRecognitionStream();
  }
}

export const controller = new socketController();
