import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaSignInAlt } from 'react-icons/fa'
import { BUTTON_ICON } from '../../../constants/iconSize'
import '../styles.css'
import '../../styles.css'
export default class SignInButton extends Component {
  render() {
    return (
      <a href="/auth/google">
        <Button variant="primary" type="submit" className="info-button__theme">
          <div className="button__wrap">
            <div className="icon__wrap">
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: BUTTON_ICON
                }}>
                <div>
                  <FaSignInAlt />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">Join</p>
            </div>
          </div>
        </Button>
      </a>
    )
  }
}
