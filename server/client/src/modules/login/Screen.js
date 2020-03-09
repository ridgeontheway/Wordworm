import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaUserPlus } from 'react-icons/fa'
import { connect } from 'react-redux'
import { TOP_ICON } from '../../constants/iconSize'
import SignInButton from '../../components/button/sign-in'
import Login from '../../components/login'

import '../styles.css'
import './styles.css'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.redirectBasedOnState()
  }

  redirectBasedOnState() {
    if (this.props.auth) {
      console.log('this is the data I am getting back = ', this.props.auth)
      this.props.handleSignIn()
    }
  }
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
                microphoneDescription={this.props.loginMicrophoneDescription}
                cloudTitle={this.props.loginCloudTitle}
                cloudDescription={this.props.loginCloudDescription}
                dbTitle={this.props.loginDBTitle}
                dbDescription={this.props.loginDbDescription}
              />
            </div>
            <div className="sign-in__theme">
              <SignInButton onSignIn={this.props.OAUTHFlow} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

Screen.propTypes = {
  loginMicrophoneTitle: PropTypes.string.isRequired,
  loginMicrophoneDescription: PropTypes.string.isRequired,
  loginCloudTitle: PropTypes.string.isRequired,
  loginCloudDescription: PropTypes.string.isRequired,
  loginDBTitle: PropTypes.string.isRequired,
  loginDbDescription: PropTypes.string.isRequired,
  OAUTHFlow: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(Screen)
