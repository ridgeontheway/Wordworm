import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CORRECT, INCORRECT, UNREAD } from '../../containers/reading/Types'
import './styles.css'
export default class ReadableContent extends Component {
  renderContent() {
    if (this.props.lookUp['status'] === CORRECT) {
      return <p className="bookContents__theme-success">{this.props.content}</p>
    } else if (this.props.lookUp['status'] === INCORRECT) {
      return <p className="bookContents__theme-fail">{this.props.content}</p>
    } else {
      return <p className="bookContents__theme">{this.props.content}</p>
    }
  }
  render() {
    return <div>{this.renderContent()}</div>
  }
}

ReadableContent.propTypes = {
  lookUp: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired
}
