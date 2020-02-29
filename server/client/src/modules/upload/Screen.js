import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { TOP_ICON } from "../../constants/iconSize";
import Upload from "../../components/upload";
import "./styles.css";
import "../styles.css";
export default class Screen extends Component {
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
                  <FaCloudUploadAlt />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="content__container">
          <div className="content__wrapper">
            <div className="login__container">
              <Upload />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
