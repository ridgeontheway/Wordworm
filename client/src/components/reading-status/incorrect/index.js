import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaQuestionCircle } from 'react-icons/fa'
import { READING_STATUS } from '../../../constants/iconSize'
import '../styles.css'
import '../../styles.css'

export default class IncorrectReadingStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashFail: false
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.incorrectWordsSpoken !== prevProps.incorrectWordsSpoken) {
      this.setState({ flashFail: true }, () => {
        setTimeout(() => {
          this.setState({ flashFail: false })
        }, 2000)
      })
    }
  }
  render() {
    return (
      <div
        className={`reading-status-content__container${
          this.state.flashFail ? ' incorrect-colorFlash' : ''
        }`}>
        <div className="reading-status__wrapper">
          <div className="reading-status-content__wrapper reading-status-content__padding ">
            <IconContext.Provider
              value={{
                color: 'white',
                size: READING_STATUS
              }}>
              <div>
                <FaQuestionCircle />
              </div>
            </IconContext.Provider>
          </div>
          <div className="reading-status-content__wrapper">
            <p className="text__body reading-status-text">
              {this.props.incorrectWordsSpoken}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

IncorrectReadingStatus.propTypes = {
  incorrectWordsSpoken: PropTypes.number.isRequired
}
