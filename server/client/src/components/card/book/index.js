import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { IconContext } from 'react-icons'
import { FaBook, FaArrowRight } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { CARD_MENU_ICON } from '../../../constants/iconSize'
import '../../styles.css'
import '../styles.css'
import './styles.css'
export default class BookCardComponent extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.onPress(this.props.bookTitle, this.props.bookID)
  }

  render() {
    return (
      <Card onClick={this.handleOnClick}>
        <Card.Body className="card__body">
          <div className="card__wrap">
            <div>
              <IconContext.Provider
                value={{
                  color: 'black',
                  size: CARD_MENU_ICON
                }}>
                <div>
                  <FaBook />
                </div>
              </IconContext.Provider>
            </div>
            <div className="book-info__container">
              <p className="text__body">{this.props.bookTitle}</p>
              <p className="text__theme no-margin__theme">
                Words Read: {this.props.wordsRead}
              </p>
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

BookCardComponent.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  wordsRead: PropTypes.number.isRequired,
  bookID: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
