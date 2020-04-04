import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import CloseButton from '../button/close'
import ReadableContent from '../readable'
import { MINI_GAME } from '../../modules/reading/Types'
import './styles.css'
import '../styles.css'
export default class BallonGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordLookUp: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.wordArr) {
      const lookUp = props.wordArr.map(incorrectWord => {
        const readingStatus = MINI_GAME
        return { word: incorrectWord['word'], status: readingStatus }
      })
      return {
        brokenWordLookUp: lookUp
      }
    }
    return null
  }

  showBrokenUpWord() {
    if (this.props.showModal) {
      return (
        <div className="wordContainer">
          {this.state.brokenWordLookUp.map((data, idx) => {
            const animationTime = Math.random() * (5 - 3 + 1) + 3
            const divStyle = {
              animationDuration: animationTime + 's'
            }
            return (
              <div className="balloon" style={divStyle} key={idx}>
                <ReadableContent content={data['word']} lookUp={data} />
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <div className="titleContainer">
            <div>
              <h2 className="title__theme">pop the ballons</h2>
            </div>
            <div>
              <p className="text__theme">say the words to pop the ballons</p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>{this.showBrokenUpWord()}</div>
        </Modal.Body>
        <Modal.Footer className="buttonContainer">
          <div>
            <CloseButton onPress={this.props.handleModalClose} />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

BallonGame.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  wordArr: PropTypes.array.isRequired
}
