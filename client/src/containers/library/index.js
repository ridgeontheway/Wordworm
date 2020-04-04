import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'
import {
  DASHBOARD_REDIRECT,
  READ_BOOK_REDIRECT
} from '../../constants/RedirectPaths'
import Screen from './Screen'
import '../styles.css'
class LibraryScreen extends Component {
  constructor() {
    super()
    this.state = {
      userSignedIn: null,
      redirect: false,
      redirectPath: '',
      bookIDSelected: null,
      bookTitleSelected: null
    }
    this.onBookSelect = this.onBookSelect.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
  }
  componentDidMount() {
    this.props.fetchUser()
    this.setState({
      bookIDSelected: null,
      bookTitleSelected: null,
      redirect: false
    })
  }

  fetchContent() {
    // Fetching the current user so we can load their book preferences
    this.props.fetchUser()
    return <h1>Loading....</h1>
  }

  loadContent() {
    // Rendering the user's books
    this.props.fetchCurrentlyReading(this.state.userSignedIn)
    return (
      <Screen
        onBookSelect={this.onBookSelect}
        onDashboardSelected={this.onDashboardSelected}
      />
    )
  }

  onBookSelect(_bookTitle, _bookID) {
    console.log('book selected', _bookTitle)
    console.log('book-id:', _bookID)
    this.setState({
      bookTitleSelected: _bookTitle,
      bookIDSelected: _bookID,
      redirect: true,
      redirectPath: READ_BOOK_REDIRECT
    })
  }

  onDashboardSelected() {
    console.log('dashboard selected!')
    this.setState({
      redirect: true,
      redirectPath: DASHBOARD_REDIRECT
    })
  }

  renderContent() {
    if (this.state.redirect) {
      if (this.state.redirectPath === DASHBOARD_REDIRECT) {
        return (
          <Redirect
            push
            to={{
              pathname: this.state.redirectPath
            }}
          />
        )
      } else {
        return (
          <Redirect
            push
            to={{
              pathname: this.state.redirectPath,
              state: {
                bookTitle: this.state.bookTitleSelected,
                bookID: this.state.bookIDSelected
              }
            }}
          />
        )
      }
    }
    if (this.state.userSignedIn) {
      return this.loadContent()
    } else {
      return this.fetchContent()
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth && state.userSignedIn !== props.auth) {
      return {
        userSignedIn: props.auth
      }
    }
    return null
  }

  render() {
    return <div className="main__container">{this.renderContent()}</div>
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(LibraryScreen)
