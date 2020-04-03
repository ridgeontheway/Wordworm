import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CORRECT,
  INCORRECT,
  UNREAD,
  SYLLABLE_FOCUSED,
  SYLLABLE_HIDDEN
} from '../../modules/reading/Types'
import './styles.css'
export default class ReadableContent extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleOnClick() {
    this.props.onClick(this.props.lookUp['word'])
  }
  renderContent() {
    if (this.props.lookUp['status'] === CORRECT) {
      return <p className="bookContents__theme-success">{this.props.content}</p>
    } else if (this.props.lookUp['status'] === INCORRECT) {
      return <p className="bookContents__theme-fail">{this.props.content}</p>
    } else if (this.props.lookUp['status'] === SYLLABLE_FOCUSED) {
      return (
        <p className="bookContents__theme-syllable-focused">
          {this.props.content}
        </p>
      )
    } else if (this.props.lookUp['status'] === SYLLABLE_HIDDEN) {
      return (
        <p className="bookContents__theme-syllable-unfocused">
          {this.props.content}
        </p>
      )
    } else {
      return <p className="bookContents__theme">{this.props.content}</p>
    }
  }
  render() {
    return <div onClick={this.handleOnClick}>{this.renderContent()}</div>
  }
}

ReadableContent.propTypes = {
  lookUp: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func
}
