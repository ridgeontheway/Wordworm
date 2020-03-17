const SocketUtility = {
  emitStartStream(socket) {
    socket.emit('startGoogleCloudStream', {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        profanityFilter: false,
        enableWordTimeOffsets: true
      },
      interimResults: true
    })
  },
  emitBinaryAudioData(data, socket) {
    socket.emit('binaryAudioData', data)
  },
  speechDataReceived(onDataCallback, socket) {
    socket.on('speechData', data => {
      onDataCallback(data)
    })
  },
  errorReceived(onErrorCallback, closeStreamCallback, socket) {
    socket.on('googleCloudStreamError', error => {
      onErrorCallback(error)
      closeStreamCallback()
    })
  },
  emitEndStream(socket) {
    socket.emit('endGoogleCloudStream', '')
  },
  endStreamListeners(socket) {
    socket.off('speechData')
    socket.off('googleCloudStreamError')
  }
}
export default SocketUtility
