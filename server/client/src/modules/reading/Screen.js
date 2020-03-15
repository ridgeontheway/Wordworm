import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaBookOpen } from 'react-icons/fa'
import { TOP_ICON } from '../../constants/iconSize'
import { connect } from 'react-redux'
import ReadableContent from '../../components/readable'
import { CORRECT, INCORRECT, UNREAD } from './Types'
import './styles.css'
import '../styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookContentLookUp: this.props.bookContentLookUp,
      confidence: 0.7
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.speechData) {
      var highestConfidence = 0
      var speechDataMap = new Map()
      props.speechData.forEach(speechElement => {
        speechElement.forEach(element => {
          const spokenConfidence = element['confidence']
          const spokenWords = element['wordArr']
          spokenWords.forEach(spokenWord => {
            speechDataMap.set(spokenWord, spokenConfidence)
          })
          highestConfidence =
            element['confidence'] >= state.confidence
              ? element['confidence']
              : highestConfidence
        })
      })
      // Pre-check to determine if we need to look though the state to update, if not we return early
      if (highestConfidence == 0) {
        return null
      }

      const updatedState = state.bookContentLookUp.map((data, idx) => {
        // The current values in the state
        const stateWord = data['word']
        var stateProgression = data['status']

        if (speechDataMap.has(stateWord)) {
          const spokenWordConfidence = speechDataMap.get(stateWord)
          if (spokenWordConfidence >= state.confidence) {
            stateProgression = CORRECT
          }
        }
        return { word: stateWord, status: stateProgression }
      })

      return {
        bookContentLookUp: updatedState
      }
    }
    return null
  }

  // this is where we are actually look up the content
  renderContent() {
    return (
      <div className="readable-content__wrapper">
        {this.state.bookContentLookUp.map((data, idx) => {
          return (
            <ReadableContent
              key={idx}
              lookUp={data}
              content={this.props.bookContent[idx]}
            />
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="screen__container">
        <div className="title__container">
          <div className="icon__container">
            <div>
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: TOP_ICON
                }}>
                <div>
                  <FaBookOpen />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="content__wrapper">
            <div>{this.props.bookContent ? this.renderContent() : null}</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    speechData: state.speechData
  }
}

Screen.propTypes = {
  bookContent: PropTypes.array.isRequired,
  bookContentLookUp: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Screen)
