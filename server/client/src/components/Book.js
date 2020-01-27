import React, { Component } from 'react'
import AudioStreamer from '../utils/streamUtility'
import socketIOClient from 'socket.io-client'

export default class Book extends Component {
  constructor () {
    super()
    this.state = {
      response: false,
      endpoint: 'http://localhost:5000'
    }
  }

  componentDidMount () {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('hello', data => this.setState({ response: data }))
  }


  render () {
    const { response } = this.state
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
