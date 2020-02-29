import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaMicrophone, FaCloud, FaDatabase } from "react-icons/fa";
import { SIGN_IN_ICON } from "../../constants/iconSize";
import PropTypes from "prop-types";
import "./styles.css";
import "../styles.css";
export default class Login extends Component {
  render() {
    return (
      <div className="login__wrap">
        <div>
          <h2 className="title__theme">sign in</h2>
        </div>
        <div>
          <p className="text__theme">to your Wordworm account through Google</p>
        </div>
        <div className="description__wrap">
          <div className="sub-description__wrap">
            <div className="icon-description__container">
              <IconContext.Provider
                value={{
                  color: "white",
                  size: SIGN_IN_ICON
                }}
              >
                <div>
                  <FaMicrophone />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <h6 className="subcard__heading">{this.props.microphoneTitle}</h6>
            </div>
            <div>
              <p className="text__theme">{this.props.microphoneDescription}</p>
            </div>
          </div>
          <div className="sub-description__wrap">
            <div className="icon-description__container">
              <IconContext.Provider
                value={{
                  color: "white",
                  size: SIGN_IN_ICON
                }}
              >
                <div>
                  <FaCloud />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <h6 className="subcard__heading">{this.props.cloudTitle}</h6>
            </div>
            <div>
              <p className="text__theme">{this.props.cloudDescription}</p>
            </div>
          </div>
          <div className="sub-description__wrap">
            <div className="icon-description__container">
              <IconContext.Provider
                value={{
                  color: "white",
                  size: SIGN_IN_ICON
                }}
              >
                <div>
                  <FaDatabase />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <h6 className="subcard__heading">{this.props.dbTitle}</h6>
            </div>
            <div>
              <p className="text__theme">{this.props.dbDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  microphoneTitle: PropTypes.string.isRequired,
  microphoneDescription: PropTypes.string.isRequired,
  cloudTitle: PropTypes.string.isRequired,
  cloudDescription: PropTypes.string.isRequired,
  dbTitle: PropTypes.string.isRequired,
  dbDescription: PropTypes.string.isRequired
};
