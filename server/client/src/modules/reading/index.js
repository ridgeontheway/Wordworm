import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class ReadingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      bookID: '',
      bookContents: ''
    }
  }
  componentDidMount() {
    this.setState(
      {
        title: this.props.location.state.bookTitle,
        bookID: this.props.location.state.bookID
      },
      () => {
        this.props.getWordsFromBook(this.state.bookID)
      }
    )
  }
  static getDerivedStateFromProps(props, state) {
    if (props.content && props.content != state.content) {
      return {
        bookContents: props.content
      }
    }
    return null
  }

  render() {
    return (
      <div className="main__container">
        {this.state.bookContents ? (
          <Screen bookContent={this.state.bookContents} />
        ) : (
          <h1>loading....</h1>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.bookContent
  }
}

export default connect(mapStateToProps, actions)(ReadingScreen)
