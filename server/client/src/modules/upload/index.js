import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import Screen from './Screen'
import * as actions from '../../actions'
import './styles.css'
import '../styles.css'
class UploadScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUploadCompleteToast: false
    }
    this.handleBookSubmission = this.handleBookSubmission.bind(this)
    this.toggleToastState = this.toggleToastState.bind(this)
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
  render() {
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
        <Screen handleFormSubmit={this.handleBookSubmission} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bookUpload: state.bookUpload
  }
}
export default connect(mapStateToProps, actions)(UploadScreen)
