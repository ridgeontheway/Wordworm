import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaUserPlus } from 'react-icons/fa'
import { TOP_ICON } from '../../constants/iconSize'
import SignInButton from '../../components/button/sign-in'
import Login from '../../components/login'

import '../styles.css'
import './styles.css'

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
                  <FaUserPlus />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="content__wrapper">
            <div className="login__container">
              <Login
                microphoneTitle={this.props.loginMicrophoneTitle}
                cloudTitle={this.props.loginCloudTitle}
                dbTitle={this.props.loginDBTitle}
              />
            </div>
            <div className="sign-in__theme">
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  loginMicrophoneTitle: PropTypes.string.isRequired,
  loginCloudTitle: PropTypes.string.isRequired,
  loginDBTitle: PropTypes.string.isRequired
}
