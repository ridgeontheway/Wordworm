import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'
import Screen from './Screen'
import Microphone from '../../components/microphone'
import { CORRECT, INCORRECT, UNREAD } from './Types'
import { DASHBOARD_REDIRECT } from '../../constants/RedirectPaths'

import './styles.css'
import '../styles.css'
class ReadingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      bookID: '',
      bookContents: '',
      bookContentsLookUp: null,
      requestedContentUpdate: false,
      redirect: false,
      redirectPath: null
    }
    this.onVoiceDataReceived = this.onVoiceDataReceived.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
  }
  componentDidMount() {
    this.setState(
      {
        title: this.props.location.state.bookTitle,
        bookID: this.props.location.state.bookID,
        requestedContentUpdate: true
      },
      () => {
        this.props.getWordsFromBook(this.state.bookID)
      }
    )
  }

  onDashboardSelected() {
    this.setState({
      redirect: true,
      redirectPath: DASHBOARD_REDIRECT
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.content &&
      props.content != state.content &&
      state.requestedContentUpdate
    ) {
      // Storing the original data from the text in split form --> to be sent as 'content' in Screen.js
      const splitData = props.content.trim().split(/\s+/)
      // Removing special characters from the text
      const bookWords = props.content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ')
      // Removing all white-space for the individual words
      const bookDataArr = bookWords.trim().split(/\s+/)
      // Mapping each element into a json object for fast validation
      const bookDataLookUp = bookDataArr.map(currentWord => {
        return { word: currentWord.toLowerCase(), status: UNREAD }
      })
      console.log('this is the data we should be retuning: ', bookDataLookUp)
      return {
        bookContents: splitData,
        bookContentsLookUp: bookDataLookUp,
        requestedContentUpdate: false
      }
    }
    return null
  }

  onVoiceDataReceived(_data) {
    this.props.processSpeechData(_data)
  }

  renderContent() {
    if (this.state.redirect && this.state.redirectPath === DASHBOARD_REDIRECT) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirectPath
          }}
        />
      )
    } else {
      return (
        <div className="main__container">
          {this.state.bookContents && this.state.bookContentsLookUp ? (
            <div className="reading-content-components__wrapper">
              <Microphone onVoiceDataReceived={this.onVoiceDataReceived} />
              <Screen
                bookContent={this.state.bookContents}
                bookContentLookUp={this.state.bookContentsLookUp}
                onDashboardSelected={this.onDashboardSelected}
              />
            </div>
          ) : (
            <h1>loading....</h1>
          )}
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

function mapStateToProps(state) {
  return {
    content: state.bookContent
  }
}

export default connect(mapStateToProps, actions)(ReadingScreen)
