import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import { FaFileUpload } from "react-icons/fa";
import "./styles.css";
import "../styles.css";
import "../../styles.css";

export default class ChooseFileButton extends Component {
  render() {
    return (
      <Button
        variant="primary"
        type="submit"
        className="choose-file-button__theme"
      >
        <div className="choose-file-button__wrap">
          <div className="icon__wrap">
            <IconContext.Provider
              value={{
                color: "white",
                size: 15
              }}
            >
              <div>
                <FaFileUpload />
              </div>
            </IconContext.Provider>
          </div>
          <div>
            <p className="text-medium__body">Choose book</p>
          </div>
        </div>
      </Button>
    );
  }
}
