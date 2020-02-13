import { controller as socketController } from "../../controllers/SocketController";

module.exports = (io: SocketIO.Server) => {
  io.on("connection", socket => {
    console.log("user has connected!");
    socket.on("startGoogleCloudStream", request => {
      socketController.startStream(socket, request);
    });
    // Receive audio data
    socket.on("binaryAudioData", data => {
      socketController.onAudioDataReceived(data);
    });

    // End the audio stream
    socket.on("endGoogleCloudStream", () => {
      socketController.endStream();
    });
  });
};
