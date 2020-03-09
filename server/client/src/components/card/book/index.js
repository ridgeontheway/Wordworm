import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { IconContext } from "react-icons";
import { FaBook, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { CARD_MENU_ICON } from "../../../constants/iconSize";
import "../../styles.css";
import "../styles.css";
import "./styles.css";
export default class BookCardComponent extends Component {
  render() {
    return (
      <Card onClick={this.props.onPress}>
        <Card.Body className="card__body">
          <div className="card__wrap">
            <div>
              <IconContext.Provider
                value={{
                  color: "black",
                  size: CARD_MENU_ICON
                }}
              >
                <div>
                  <FaBook />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              {!(
                Object.entries(this.props.bookInfo).length === 0 &&
                this.props.bookInfo.constructor === Object
              ) ? (
                <div className="book-info__container">
                  <p className="text__body">{this.props.bookInfo["title"]}</p>
                  <p className="text__theme no-margin__theme">
                    Words Read: {this.props.bookInfo["words"]}
                  </p>
                </div>
              ) : (
                <p className="text__body">Getting book data...</p>
              )}
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

BookCardComponent.propTypes = {
  bookInfo: PropTypes.object,
  onPress: PropTypes.func
};
