import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class LibraryScreen extends Component {
  constructor() {
    super()
    this.state = {
      userSignedIn: null
    }
  }
  componentDidMount() {
    this.props.fetchUser()
  }

  fetchContent() {
    // Fetching the current user so we can load their book preferences
    this.props.fetchUser()
    return <h1>Loading....</h1>
  }

  loadContent() {
    // Rendering the user's books
    this.props.fetchCurrentlyReading(this.state.userSignedIn)
    return <Screen />
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth && state.userSignedIn != props.auth) {
      return {
        userSignedIn: props.auth
      }
    }
    return null
  }

  render() {
    return (
      <div className="main__container">
        {this.state.userSignedIn ? this.loadContent() : this.fetchContent()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(LibraryScreen)
