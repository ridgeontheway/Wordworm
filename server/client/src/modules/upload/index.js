import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "./Screen";
import * as actions from "../../actions";
import "../styles.css";
class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBookSubmission = this.handleBookSubmission.bind(this);
  }
  handleBookSubmission(_formData) {
    this.props.uploadBook(_formData);
  }
  render() {
    return (
      <div className="main__container">
        <Screen handleFormSubmit={this.handleBookSubmission} />
      </div>
    );
  }
}
export default connect(null, actions)(UploadScreen);
