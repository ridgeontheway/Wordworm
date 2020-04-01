import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import ReadableContent from '../readable'
import { SYLLABLE_FOCUSED, SYLLABLE_HIDDEN } from '../../modules/reading/Types'
import './styles.css'
import '../styles.css'
export default class SelfRegulationFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brokenWordLookUp: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.wordArr) {
      const syllableLookUp = props.wordArr.map((letterArr, idx) => {
        const twoLetterCombinationStr = letterArr.join('')
        const readingStatus = idx === 0 ? SYLLABLE_FOCUSED : SYLLABLE_HIDDEN
        return { word: twoLetterCombinationStr, status: readingStatus }
      })
      return {
        brokenWordLookUp: syllableLookUp
      }
    }
  }

  showBrokenUpWord() {
    if (this.props.showModal) {
      return (
        <div className="wordContainer">
          {this.state.brokenWordLookUp.map((data, idx) => {
            return (
              <ReadableContent content={data['word']} lookUp={data} key={idx} />
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
        <Modal.Header closeButton>
          <div className="titleContainer">
            <div>
              <h2 className="title__theme">
                having trouble with '{this.props.word}'
              </h2>
            </div>
            <div>
              <p className="text__theme">try breaking it up</p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>{this.showBrokenUpWord()}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

SelfRegulationFeedback.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  wordArr: PropTypes.array.isRequired,
  word: PropTypes.string.isRequired
}
