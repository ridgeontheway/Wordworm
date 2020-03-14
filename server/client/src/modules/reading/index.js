import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import { CORRECT, INCORRECT, UNREAD } from './Types'
import '../styles.css'
class ReadingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      bookID: '',
      bookContents: '',
      bookContentsLookUp: null
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
      // Storing the original data from the text in split form --> to be sent as 'content' in Screen.js
      const splitData = props.content.trim().split(/\s+/)
      // Removing special characters from the text
      const bookWords = props.content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ')
      // Removing all white-space for the individual words
      const bookDataArr = bookWords.trim().split(/\s+/)
      // Mapping each element into a json object for fast validation
      const bookDataLookUp = bookDataArr.map(currentWord => {
        return { word: currentWord.toLowerCase(), status: UNREAD }
      })
      console.log('this is the data we should be retuning: ', bookDataLookUp)
      return {
        bookContents: splitData,
        bookContentsLookUp: bookDataLookUp
      }
    }
    return null
  }

  updateBookContents() {}

  render() {
    return (
      <div className="main__container">
        {this.state.bookContents && this.state.bookContentsLookUp ? (
          <Screen
            bookContent={this.state.bookContents}
            bookContentLookUp={this.state.bookContentsLookUp}
          />
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
