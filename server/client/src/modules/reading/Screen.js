import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaBookOpen } from 'react-icons/fa'
import { TOP_ICON } from '../../constants/iconSize'
import './styles.css'
import '../styles.css'
export default class Screen extends Component {
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
            <p className="bookContents__theme">{this.props.bookContent}</p>
          </div>
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  bookContent: PropTypes.string.isRequired
}
