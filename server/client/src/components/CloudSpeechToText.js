import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import ConverterUtility from '../utilities/converterUtility'
import SocketUtility from '../utilities/socketUtility'

export default class CloudSpeechToText extends Component {
  constructor () {
    super()
    this.bufferSize = 2048
    this.constraints = {
      audio: true,
      video: false
    }
    this.AudioContext = null
    this.context = null
    this.processor = null
    this.input = null
    this.globalStream = null
  }

  componentWillMount () {
    // creating the audio context
    var AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext()
    this.socket = openSocket('http://localhost:5000')
  }

  componentWillUnmount () {
    // closing the audio context
    this.closeAll()
  }

  initRecording (onData, onError) {
    SocketUtility.emitStartStream()
    this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1)
    this.processor.connect(this.context.destination)
    this.context.resume()

    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.globalStream = stream
      this.input = this.context.createMediaStreamSource(stream)
      this.input.connect(this.processor)

      this.processor.onaudioprocess = (e) => {
        var left = e.inputBuffer.getChannelData(0)
        var left16 = ConverterUtility.convertFloat32ToInt16(left)
        SocketUtility.emitBinaryAudioData(left16)
      }
    })

    if (onData) {
      SocketUtility.speechDataRecieved(onData)
    }
    SocketUtility.errorRecieved(onError, this.closeAll)
  }

  stopRecording () {
    SocketUtility.emitEndStream()
    this.closeAll()
  }

  closeAll () {
    SocketUtility.endStreamListeners()

    const tracks = this.globalStream ? this.globalStream.getTracks() : null
    const track = tracks ? tracks[0] : null

    if (track) {
      track.stop()
    }

    if (this.processor) {
      if (this.input) {
        try {
          this.input.disconnect(this.processor)
        } catch (error) {
          console.warn('WARN: unable to disconnect input')
        }
      }
      this.processor.disconnect(this.context.destination)
    }

    if (this.context) {
      this.context.close().then(() => {
        this.input = null
        this.processor = null
        this.context = null
        this.AudioContext = null
      })
    }
  }

  streamAudio () {
    this.initRecording((data) => {
      console.log(data)
    }, (error) => {
      console.error('error when recording: ', error)
    })
  }

  render () {
    return (
      <button
        className='btn name'
        onClick={this.streamAudio()}
      >
        {this.props.label}
      </button>
    )
  }
}
