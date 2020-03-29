import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaCheckCircle } from 'react-icons/fa'
import { READING_STATUS } from '../../../constants/iconSize'
import '../styles.css'
import '../../styles.css'

export default class CorrectReadingStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashSuccess: false
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.correctWordsSpoken != prevProps.correctWordsSpoken) {
      this.setState({ flashSuccess: true }, () => {
        setTimeout(() => {
          this.setState({ flashSuccess: false })
        }, 2000)
      })
    }
  }
  render() {
    return (
      <div
        className={`reading-status-content__container-margin reading-status-content__container${
          this.state.flashSuccess ? ' correct-colorFlash' : ''
        }`}>
        <div className="reading-status__wrapper">
          <div className="reading-status-content__wrapper reading-status-content__padding ">
            <IconContext.Provider
              value={{
                color: 'white',
                size: READING_STATUS
              }}>
              <div>
                <FaCheckCircle />
              </div>
            </IconContext.Provider>
          </div>
          <div className="reading-status-content__wrapper">
            <p className="text__body reading-status-text">
              {this.props.correctWordsSpoken}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

CorrectReadingStatus.propTypes = {
  correctWordsSpoken: PropTypes.number.isRequired
}
