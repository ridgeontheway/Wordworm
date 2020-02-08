import { speechToTextService } from '../services/speechToTextService'
module.exports = (io: SocketIO.Server) => {
    io.on('connection', function (socket) {
        console.log('user has connected!')
        socket.on('startGoogleCloudStream', function(request) {
            console.log('speech stream started!')
            speechToTextService.startRecognitionStream(socket, request);
        });
        // Receive audio data
        socket.on('binaryAudioData', function(data) {
            speechToTextService.receiveData(data);
        });
    
        // End the audio stream
        socket.on('endGoogleCloudStream', function() {
            speechToTextService.stopRecognitionStream();
        });
    })
}