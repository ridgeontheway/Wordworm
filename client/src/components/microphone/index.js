import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import io from 'socket.io-client'
import { CARD_MENU_ICON } from '../../constants/iconSize'
import { AUDIO_STREAM_SAMPLING_RATE } from '../../constants/SpeechRecginition'
import ConverterUtility from '../../utilities/converterUtility'
import SocketUtility from '../../utilities/socketUtility'
import './styles.css'

const socket = io()

export default class Microphone extends Component {
  constructor() {
    super()
    this.state = {
      record: false
    }
    // Properties used for voice streaming over SocketIO

    // Buffer-size set to 0 as per recommendations by Mozilla
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer/getChannelData
    this.bufferSize = 0
    this.constraints = {
      audio: true,
      video: false
    }
    this.context = null
    this.processor = null
    this.input = null
    this.globalStream = null

    this.streamAudio = this.streamAudio.bind(this)
    this.initRecording = this.initRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
    this.closeAll = this.closeAll.bind(this)
    this.renderButton = this.renderButton.bind(this)
  }

  componentWillUnmount() {
    if (this.input) {
      // closing the audio context
      this.stopRecording()
    }
  }

  initRecording(onData, onError) {
    SocketUtility.emitStartStream(socket)
    this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1)
    this.processor.connect(this.context.destination)
    this.context.resume()
    ConverterUtility.setSampleRate(this.context.sampleRate)

    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.globalStream = stream
      this.input = this.context.createMediaStreamSource(stream)
      this.input.connect(this.processor)
      this.processor.onaudioprocess = e => {
        var left = e.inputBuffer.getChannelData(0)
        var left16 = ConverterUtility.downSampleAudioBuffer(
          left,
          AUDIO_STREAM_SAMPLING_RATE
        )
        SocketUtility.emitBinaryAudioData(left16, socket)
      }
    })

    if (onData) {
      SocketUtility.speechDataReceived(onData, socket)
    }
    SocketUtility.errorReceived(onError, this.closeAll, socket)
  }

  stopRecording() {
    this.setState({ record: false })
    SocketUtility.emitEndStream(socket)
    this.closeAll()
  }

  closeAll() {
    SocketUtility.endStreamListeners(socket)

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
      })
    }
  }

  streamAudio() {
    this.setState({ record: true }, () => {
      var AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
      this.initRecording(
        data => {
          this.props.onVoiceDataReceived(data)
        },
        error => {
          console.error('error when recording: ', error)
        }
      )
    })
  }

  renderButton() {
    if (this.state.record) {
      return (
        <Button className="btn-circle btn-xl" onClick={this.stopRecording}>
          <div>
            <IconContext.Provider
              value={{
                color: 'white',
                size: CARD_MENU_ICON
              }}>
              <div>
                <FaMicrophoneSlash />
              </div>
            </IconContext.Provider>
          </div>
        </Button>
      )
    } else {
      return (
        <Button className="btn-circle btn-xl" onClick={this.streamAudio}>
          <div>
            <IconContext.Provider
              value={{
                color: 'white',
                size: CARD_MENU_ICON
              }}>
              <div>
                <FaMicrophone />
              </div>
            </IconContext.Provider>
          </div>
        </Button>
      )
    }
  }

  render() {
    return <div className="button__wrapper">{this.renderButton()}</div>
  }
}

Microphone.propTypes = {
  onVoiceDataReceived: PropTypes.func.isRequired
}
