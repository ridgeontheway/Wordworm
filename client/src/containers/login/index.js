import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth) {
      return {
        redirect: true
      }
    }
    return null
  }

  render() {
    return (
      <div className="main__container">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: '/dashboard'
            }}
          />
        ) : (
          <Screen
            loginMicrophoneTitle="State of the art speech processing"
            loginCloudTitle="Sync your progress across devices"
            loginDBTitle="Privacy first: no speech data is stored"
            handleSignIn={this.handleSignIn}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(LoginScreen)
