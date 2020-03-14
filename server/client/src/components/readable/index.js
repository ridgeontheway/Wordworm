import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
export default class ReadableContent extends Component {
  render() {
    return <p className="bookContents__theme">{this.props.content}</p>
  }
}

ReadableContent.propTypes = {
  lookUp: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired
}
