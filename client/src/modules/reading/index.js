import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compareTwoStrings } from 'string-similarity'
import * as actions from '../../actions'
import Screen from './Screen'
import Microphone from '../../components/microphone'
import { CORRECT, INCORRECT, UNREAD } from './Types'
import {
  SPOKEN_CONFIDENCE,
  WORD_SIMILARITY
} from '../../constants/SpeechRecginition'
import {
  DASHBOARD_REDIRECT,
  LIBRARY_REDIRECT
} from '../../constants/RedirectPaths'

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
      wordsSpokenCorrectly: 0,
      requestedContentUpdate: false,
      redirect: false,
      redirectPath: null
    }
    this.onVoiceDataReceived = this.onVoiceDataReceived.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
    this.onLibrarySelected = this.onLibrarySelected.bind(this)
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

  onLibrarySelected() {
    this.setState({
      redirect: true,
      redirectPath: LIBRARY_REDIRECT
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
    } else if (props.speechData) {
      var highestConfidence = 0
      var speechData = []
      props.speechData.forEach(speechElement => {
        speechElement.forEach(element => {
          const confidence = element['confidence']
          const spokenWords = element['wordArr']
          spokenWords.forEach(word => {
            console.log(word)
            speechData.push({ word, confidence })
          })
          highestConfidence =
            element['confidence'] >= SPOKEN_CONFIDENCE
              ? element['confidence']
              : highestConfidence
        })
      })
      // Pre-check to determine if we need to look though the state to update, if not we return early
      if (highestConfidence == 0) {
        return null
      }
      var updatedWordsCorrect = state.spokenWordsCorrectly
      const updatedState = state.bookContentsLookUp.map((data, idx) => {
        // The current values in the state
        const stateWord = data['word']
        var stateProgression = data['status']

        if (stateProgression != CORRECT) {
          for (var i = 0; i < speechData.length; i++) {
            const {
              confidence: currentConfidence,
              word: currentWord
            } = speechData[i]

            const similarity = compareTwoStrings(currentWord, stateWord)
            // A match has been made
            if (
              (currentWord == stateWord &&
                currentConfidence >= state.confidence) ||
              similarity >= WORD_SIMILARITY
            ) {
              stateProgression = CORRECT
              speechData.splice(i, 1)
              updatedWordsCorrect++
              break
            }
          }
        }

        return { word: stateWord, status: stateProgression }
      })

      return {
        bookContentsLookUp: updatedState
      }
    }
    return null
  }

  onVoiceDataReceived(_data) {
    this.props.processSpeechData(_data)
  }

  renderContent() {
    if (this.state.redirect) {
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
                onLibrarySelected={this.onLibrarySelected}
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
    content: state.bookContent,
    speechData: state.speechData
  }
}

export default connect(mapStateToProps, actions)(ReadingScreen)
