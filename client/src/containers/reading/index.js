import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'
import Screen from './Screen'
import Microphone from '../../components/microphone'
import CorrectReadingStatus from '../../components/reading-status/correct'
import IncorrectReadingStatus from '../../components/reading-status/incorrect'
import SelfRegulationFeedback from '../../components/self-regulaton-feedback'
import BallonGame from '../../components/ballon-game'
import SyllableUtility from '../../utilities/syllableUtility'
import { UNREAD, INCORRECT } from './Types'
import SpeechUtility from '../../utilities/speechUtility'
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
      showRegulationModal: false,
      showMiniGameModal: false,
      modalWordArr: [],
      modalMiniGameArr: [],
      modalWord: ''
    }
    this.onVoiceDataReceived = this.onVoiceDataReceived.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
    this.onLibrarySelected = this.onLibrarySelected.bind(this)
    this.onIncorrectWordClicked = this.onIncorrectWordClicked.bind(this)
    this.toggleSelfRegulationModal = this.toggleSelfRegulationModal.bind(this)
    this.onMiniGameClicked = this.onMiniGameClicked.bind(this)
    this.toggleMiniGameModal = this.toggleMiniGameModal.bind(this)
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
      props.content !== state.content &&
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
    } else if (
      props.speechData &&
      !state.showRegulationModal &&
      !state.showMiniGameModal
    ) {
      const updatedState = SpeechUtility.processReducedSpeechData(
        props.speechData,
        state.bookContentsLookUp,
        state.wordsSpokenCorrectly,
        state.wordsSpokenIncorrectly
      )

      if (updatedState) {
        // Clearing the redux state before over-riding local state
        props.clearSpeechData()
        return {
          bookContentsLookUp: updatedState['bookContentsLookUp'],
          wordsSpokenCorrectly: updatedState['wordsSpokenCorrectly'],
          wordsSpokenIncorrectly: updatedState['wordsSpokenIncorrectly']
        }
      } else {
        return null
      }
    } else if (props.speechData && state.showRegulationModal) {
      props.clearSpeechData()
    }
    return null
  }

  onVoiceDataReceived(_data) {
    // Only calling the API if the modal is hidden
    if (!this.state.showRegulationModal) {
      this.props.processSpeechData(_data)
    }
  }

  onIncorrectWordClicked(_word) {
    const syllableArr = SyllableUtility.findSyllables(_word)
    const splitWord = SyllableUtility.breakUpLongSyllables(syllableArr)
    this.setState({
      showRegulationModal: true,
      modalWordArr: splitWord,
      modalWord: _word
    })
  }

  onMiniGameClicked() {
    // Extracting the incorrect words from the overall state
    const incorrectWordsArr = this.state.bookContentsLookUp.filter(data => {
      const { status: currentWordStatus } = data
      return currentWordStatus === INCORRECT
    })
    this.setState({
      showMiniGameModal: true,
      modalMiniGameArr: incorrectWordsArr
    })
  }

  toggleMiniGameModal() {
    this.setState({
      showMiniGameModal: !this.state.showMiniGameModal
    })
  }

  toggleSelfRegulationModal() {
    this.setState({
      showRegulationModal: !this.state.showRegulationModal
    })
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
                onMiniGameSelected={this.onMiniGameClicked}
                numIncorrectWords={this.state.wordsSpokenIncorrectly}
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
                showModal={this.state.showRegulationModal}
                handleModalClose={this.toggleSelfRegulationModal}
                wordArr={this.state.modalWordArr}
                word={this.state.modalWord}
                clearSpeechData={this.props.clearSpeechData}
              />
              <BallonGame
                showModal={this.state.showMiniGameModal}
                handleModalClose={this.toggleMiniGameModal}
                wordArr={this.state.modalMiniGameArr}
                clearSpeechData={this.props.clearSpeechData}
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
