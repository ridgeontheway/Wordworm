import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { FaBook } from 'react-icons/fa'
import { connect } from 'react-redux'
import { TOP_ICON } from '../../constants/iconSize'
import BookCardComponent from '../../components/card/book'
import DashboardButton from '../../components/button/dashboard'
import './styles.css'
import '../styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      readingInfo: null
    }
  }

  renderReadingInfo() {
    const data = this.state.readingInfo
    return (
      <div className="book-progress__container">
        {data.map((data, idx) => {
          const bookTitle = data['title']
          const wordsRead = data['wordsRead']
          const bookID = data['id']
          return (
            <div className="library-card__container">
              <BookCardComponent
                key={idx}
                bookTitle={bookTitle}
                wordsRead={wordsRead}
                bookID={bookID}
                onPress={this.props.onBookSelect}
              />
            </div>
          )
        })}
      </div>
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.readingInfo && props.readingInfo !== state.readingInfo) {
      return {
        readingInfo: props.readingInfo
      }
    }
    return null
  }

  render() {
    return (
      <div className="screen__container">
        <div className="title__container">
          <div className="icon__container">
            <div>
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: TOP_ICON
                }}>
                <div>
                  <FaBook />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          {this.state.readingInfo ? this.renderReadingInfo() : null}
          <div className="button__container">
            <DashboardButton onPress={this.props.onDashboardSelected} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    readingInfo: state.readingInfo
  }
}

Screen.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
  onDashboardSelected: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
