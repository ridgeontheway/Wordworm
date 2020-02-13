import { controller as socketController } from "../controllers/socketController";

module.exports = (io: SocketIO.Server) => {
  io.on("connection", function(socket) {
    console.log("user has connected!");
    socket.on("startGoogleCloudStream", function(request) {
      socketController.startStream(socket, request);
    });
    // Receive audio data
    socket.on("binaryAudioData", function(data) {
      socketController.onAudioDataReceived(data);
    });

    // End the audio stream
    socket.on("endGoogleCloudStream", function() {
      socketController.endStream();
    });
  });
};
