import React, { Component } from 'react'
import speechToTextUtils from '../utils/streamUtility'
import socketIOClient from 'socket.io-client'

export default class Book extends Component {
  constructor () {
    super()
    this.state = {
      response: false,
      endpoint: 'http://localhost:5000'
    }
  }

  thing () {
    speechToTextUtils.initRecording((data) => {
      console.log(data)
    }, (error) => {
      console.error('Error when recording', error)
        this.setState({ recording: false })
        // No further action needed, as this already closes itself on error
    })
  }

  onStop () {
    this.setState({ recording: false })
    speechToTextUtils.stopRecording()
    if (this.props.onStop) {
      this.props.onStop()
    }
  }

  render () {
    const { response } = this.state
    this.thing()
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        {response
          ? <p>
            This is the response that we got back from the server: {response} :)
            </p>
          : <p>Loading.....</p>}
      </div>
    )
  }
}
