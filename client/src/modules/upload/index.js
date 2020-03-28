import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import Screen from './Screen'
import * as actions from '../../actions'
import { DASHBOARD_REDIRECT } from '../../constants/RedirectPaths'

import './styles.css'
import '../styles.css'
class UploadScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUploadCompleteToast: false,
      redirect: false,
      redirectPath: null
    }
    this.handleBookSubmission = this.handleBookSubmission.bind(this)
    this.toggleToastState = this.toggleToastState.bind(this)
    this.onDashboardSelected = this.onDashboardSelected.bind(this)
  }

  toggleToastState() {
    this.setState({ showUploadCompleteToast: false })
    this.props.resetUploadStatus()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.bookUpload && props.bookUpload != state.showUploadCompleteToast) {
      return {
        showUploadCompleteToast: true
      }
    }
    return null
  }

  handleBookSubmission(_formData, _fileName) {
    this.props.uploadBook(_formData, _fileName)
  }

  onDashboardSelected() {
    this.setState({
      redirect: true,
      redirectPath: DASHBOARD_REDIRECT
    })
  }

  renderContent() {
    if (this.state.redirect && this.state.redirectPath === DASHBOARD_REDIRECT) {
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
        <div className="upload-content-main__container">
          <div
            aria-live="polite"
            aria-atomic="true"
            style={{
              position: 'relative',
              minHeight: '200px'
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0
              }}>
              <Toast
                onClose={this.toggleToastState}
                show={this.state.showUploadCompleteToast}
                delay={3000}
                autohide>
                <Toast.Header>
                  <strong className="mr-auto">Wordworm</strong>
                  <small>just now</small>
                </Toast.Header>
                <Toast.Body>
                  your book has just been uploaded, please visit the library to
                  start reading!
                </Toast.Body>
              </Toast>
            </div>
          </div>
          <Screen
            handleFormSubmit={this.handleBookSubmission}
            onDashboardSelected={this.onDashboardSelected}
          />
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

function mapStateToProps(state) {
  return {
    bookUpload: state.bookUpload
  }
}
export default connect(mapStateToProps, actions)(UploadScreen)
