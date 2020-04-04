import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { GiRetroController } from 'react-icons/gi'
import { BUTTON_ICON } from '../../../constants/iconSize'
import '../styles.css'
import '../../styles.css'

export default class MiniGameButton extends Component {
  renderButtonBasedOnPropState() {
    if (this.props.isClickable) {
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
                  <GiRetroController />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">Play</p>
            </div>
          </div>
        </Button>
      )
    } else {
      return (
        <Button
          variant="primary"
          type="submit"
          className="info-button__theme"
          onClick={this.props.onPress}
          disabled>
          <div className="button__wrap">
            <div className="icon__wrap">
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: BUTTON_ICON
                }}>
                <div>
                  <GiRetroController />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">Play</p>
            </div>
          </div>
        </Button>
      )
    }
  }

  render() {
    return <div>{this.renderButtonBasedOnPropState()}</div>
  }
}

MiniGameButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  isClickable: PropTypes.bool.isRequired
}
