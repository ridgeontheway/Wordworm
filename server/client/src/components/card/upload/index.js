import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { IconContext } from "react-icons";
import { FaCloudUploadAlt, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { CARD_MENU_ICON } from "../../../constants/iconSize";
import "../styles.css";
import "../../styles.css";

export default class UploadCardComponent extends Component {
  render() {
    return (
      <Card onClick={this.props.onPress}>
        <Card.Body>
          <div className="card__wrap">
            <div>
              <IconContext.Provider
                value={{
                  color: "black",
                  size: CARD_MENU_ICON
                }}
              >
                <div>
                  <FaCloudUploadAlt />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">{this.props.text}</p>
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

UploadCardComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func
};
