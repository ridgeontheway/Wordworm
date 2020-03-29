import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaCheckCircle } from 'react-icons/fa'
import { CARD_MENU_ICON } from '../../constants/iconSize'
import './styles.css'
import '../styles.css'

export default class ReadingStatus extends Component {
  render() {
    return (
      <div className="reading-status__container">
        <div className="reading-status__wrapper">
          <div>
            <IconContext.Provider
              value={{
                color: 'white',
                size: CARD_MENU_ICON
              }}>
              <div>
                <FaCheckCircle />
              </div>
            </IconContext.Provider>
          </div>
          <div>
            <p>{this.props.correctWordsSpoken}</p>
          </div>
        </div>
      </div>
    )
  }
}

ReadingStatus.propTypes = {
  correctWordsSpoken: PropTypes.number.isRequired
}
