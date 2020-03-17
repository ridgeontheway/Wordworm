import React, { Component } from 'react'
import CloudSpeechToText from './CloudSpeechToText'

export default class Book extends Component {
  constructor () {
    super()
    this.state = {
      response: false,
      endpoint: 'http://localhost:5000',
      render: false
    }
  }

  add () {
    this.setState({ render: !this.state.render })
  }

  render () {
    return (
      <div className='BookTemp'>
        <button onClick={() => this.add()}>CLICK!</button>
        {
          this.state.render && <CloudSpeechToText />
        }
      </div>
    )
  }
}
