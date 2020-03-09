import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { FaBookOpen } from "react-icons/fa";
import { connect } from "react-redux";
import { TOP_ICON } from "../../constants/iconSize";
import BookCardComponent from "../../components/card/book";
import "../styles.css";
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readingInfo: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.readingInfo && props.readingInfo !== state.readingInfo) {
      console.log(props.readingInfo);
      return {
        readingInfo: props.readingInfo
      };
    }
    return null;
  }

  render() {
    return (
      <div className="screen__container">
        <div className="title__container">
          <div className="icon__container">
            <div>
              <IconContext.Provider
                value={{
                  color: "white",
                  size: TOP_ICON
                }}
              >
                <div>
                  <FaBookOpen />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="library-card__container">
            <BookCardComponent bookInfo={this.state.readingInfo} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    readingInfo: state.readingInfo
  };
}

export default connect(mapStateToProps)(Screen);
