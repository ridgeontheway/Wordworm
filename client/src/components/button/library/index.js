import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaBook } from 'react-icons/fa'
import { BUTTON_ICON } from '../../../constants/iconSize'
import '../styles.css'
import '../../styles.css'

export default class LibraryButton extends Component {
  render() {
    return (
      <Button
        variant="primary"
        type="submit"
        className="info-button__theme"
        onClick={this.props.onPress}>
        <div className="button__wrap">
          <div className="icon__wrap">
            <IconContext.Provider
              value={{
                color: 'white',
                size: BUTTON_ICON
              }}>
              <div>
                <FaBook />
              </div>
            </IconContext.Provider>
          </div>
          <div>
            <p className="text__body">Library</p>
          </div>
        </div>
      </Button>
    )
  }
}

LibraryButton.propTypes = {
  onPress: PropTypes.func.isRequired
}
