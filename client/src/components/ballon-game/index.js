import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CloseButton from '../button/close'
import ReadableContent from '../readable'
import { MINI_GAME, MINI_GAME_SUCCESS } from '../../containers/reading/Types'
import SpeechUtility from '../../utilities/speechUtility'
import './styles.css'
import '../styles.css'
class BallonGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordLookUp: [],
      wordsInitialized: false
    }
    this.closeModal = this.closeModal.bind(this)
  }

  // When the modal is closed, the data will need to be re-initialized once it is opened next
  closeModal() {
    this.setState({ wordsInitialized: false, wordLookUp: [] }, () =>
      this.props.handleModalClose()
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.showModal) {
      if (props.wordArr && !state.wordsInitialized) {
        const lookUp = props.wordArr.map(incorrectWord => {
          const readingStatus = MINI_GAME
          return { word: incorrectWord['word'], status: readingStatus }
        })
        return {
          wordLookUp: lookUp,
          wordsInitialized: true
        }
      } else if (props.speechData) {
        const updatedState = SpeechUtility.processReducedMiniGameSpeechData(
          props.speechData,
          state.wordLookUp
        )
        if (updatedState) {
          props.clearSpeechData()
          return {
            wordLookUp: updatedState['correctWordLookUp']
          }
        }
      }
    }
    return null
  }

  showBallons() {
    if (this.props.showModal) {
      return (
        <div className="wordContainer">
          {this.state.wordLookUp.map((data, idx) => {
            const animationTime = Math.random() * (5 - 3 + 1) + 3
            const divStyle = {
              animationDuration: animationTime + 's'
            }
            if (data['status'] === MINI_GAME_SUCCESS) {
              return (
                <div className="balloon-success" style={divStyle} key={idx}>
                  <ReadableContent content={data['word']} lookUp={data} />
                </div>
              )
            } else {
              return (
                <div className="balloon" style={divStyle} key={idx}>
                  <ReadableContent content={data['word']} lookUp={data} />
                </div>
              )
            }
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <div className="titleContainer">
            <div>
              <h2 className="title__theme">change the balloons</h2>
            </div>
            <div>
              <p className="text__theme">
                say the words correctly to make the balloons change colour
              </p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>{this.showBallons()}</div>
        </Modal.Body>
        <Modal.Footer className="buttonContainer">
          <div>
            <CloseButton onPress={this.closeModal} />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    speechData: state.speechData
  }
}

BallonGame.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  wordArr: PropTypes.array.isRequired,
  clearSpeechData: PropTypes.func.isRequired
}

export default connect(mapStateToProps, null)(BallonGame)
