import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')

const SocketUtility = {
  emitStartStream () {
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
  emitBinaryAudioData (data) {
    socket.emit('binaryAudioData', data)
  },
  speechDataReceived (onDataCallback) {
    socket.on('speechData', (data) => {
      onDataCallback(data)
    })
  },
  errorReceived (onErrorCallback, closeStreamCallback) {
    socket.on('googleCloudStreamError', (error) => {
      onErrorCallback(error)
      closeStreamCallback()
    })
  },
  emitEndStream () {
    socket.emit('endGoogleCloudStream', '')
  },
  endStreamListeners () {
    socket.off('speechData')
    socket.off('googleCloudStreamError')
  }
}
export default SocketUtility
