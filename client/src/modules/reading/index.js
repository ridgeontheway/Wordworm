import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compareTwoStrings } from 'string-similarity'
import * as actions from '../../actions'
import Screen from './Screen'
import Microphone from '../../components/microphone'
import CorrectReadingStatus from '../../components/reading-status/correct'
import IncorrectReadingStatus from '../../components/reading-status/incorrect'
import SelfRegulationFeedback from '../../components/self-regulaton-feedback'
import SyllableUtility from '../../utilities/syllableUtility'
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
      wordsSpokenIncorrectly: 0,
      requestedContentUpdate: false,
      redirect: false,
      redirectPath: null,
      showModal: false,
      modalWordArr: [[]],
      modalWord: ''
    }
    this.onVoiceDataReceived = this.onVoiceDataReceived.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
    this.onLibrarySelected = this.onLibrarySelected.bind(this)
    this.onIncorrectWordClicked = this.onIncorrectWordClicked.bind(this)
    this.toggleSelfRegulationModal = this.toggleSelfRegulationModal.bind(this)
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
      var updatedWordsCorrect = state.wordsSpokenCorrectly
      var updatedWordsIncorrect = state.wordsSpokenIncorrectly
      const updatedState = state.bookContentsLookUp.map((data, idx) => {
        // The current values in the state
        const stateWord = data['word']
        var stateProgression = data['status']
        // Checking if the state word is correct
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
          // Checking if a given word is incorrect
          // TODO: think of a way to make this more robust
          if (
            idx > 0 &&
            idx < state.bookContentsLookUp.length - 1 &&
            stateProgression != INCORRECT
          ) {
            const {
              status: wordBeforeCurrentStateProgression
            } = state.bookContentsLookUp[idx - 1]
            const {
              status: wordAfterCurrentStateProgression
            } = state.bookContentsLookUp[idx + 1]
            if (
              wordBeforeCurrentStateProgression === CORRECT &&
              wordAfterCurrentStateProgression === CORRECT
            ) {
              console.log('this is incorrect??', stateWord)
              stateProgression = INCORRECT
              updatedWordsIncorrect++
            }
          }
        }

        return { word: stateWord, status: stateProgression }
      })

      return {
        bookContentsLookUp: updatedState,
        wordsSpokenCorrectly: updatedWordsCorrect,
        wordsSpokenIncorrectly: updatedWordsIncorrect
      }
    }
    return null
  }

  onVoiceDataReceived(_data) {
    this.props.processSpeechData(_data)
  }

  onIncorrectWordClicked(_word) {
    const syllableArr = SyllableUtility.findSyllables(_word)
    const splitWord = SyllableUtility.breakUpLongSyllables(syllableArr)
    this.setState({
      showModal: true,
      modalWordArr: splitWord,
      modalWord: _word
    })
  }

  toggleSelfRegulationModal() {
    this.setState({ showModal: !this.state.showModal })
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
                onIncorrectWordClicked={this.onIncorrectWordClicked}
              />
              <div className="reading-status__container">
                <CorrectReadingStatus
                  correctWordsSpoken={this.state.wordsSpokenCorrectly}
                />
                <IncorrectReadingStatus
                  incorrectWordsSpoken={this.state.wordsSpokenIncorrectly}
                />
              </div>
              <SelfRegulationFeedback
                showModal={this.state.showModal}
                handleModalClose={this.toggleSelfRegulationModal}
                wordArr={this.state.modalWordArr}
                word={this.state.modalWord}
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
