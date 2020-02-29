import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import ChooseFileButton from "../../components/button/choose-file";
import "./styles.css";
import "../styles.css";

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
      fileSelected: "hello world!!"
    };
  }
  render() {
    return (
      <div className="upload__wrap">
        <div>
          <h2 className="title__theme">save a book</h2>
        </div>
        <div>
          <p className="text__theme">store your new book in the cloud</p>
        </div>
        <div className="upload-form__wrap">
          <Form>
            <Form.Group controlId="idLogin">
              <label for="file-upload" class="custom-file-upload">
                <div className="upload-form__container">
                  <ChooseFileButton />
                  <p className="text-medium__body">{this.state.fileSelected}</p>
                </div>
              </label>
              <Form.Control
                id="file-upload"
                type="file"
                accept=".epub"
                label="upload"
                class="form-control-file"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
