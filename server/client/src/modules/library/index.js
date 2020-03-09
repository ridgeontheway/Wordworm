import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Screen from "./Screen";
import "../styles.css";
// 1. call the fetch user
// 2. once I get an update from the API back, I need to check to see if I am currently reading anything
// 3. If I am currently reading anything, I need to find that by ID
// 4. If I am not, then I need to create the book progress
class LibraryScreen extends Component {
  constructor() {
    super();
    this.state = {
      bookTitle: "Moby Dick",
      wordsRead: 0
    };
  }
  componentDidMount() {
    this.props.fetchCurrentlyReading();
  }
  render() {
    return (
      <div className="main__container">
        <Screen />
      </div>
    );
  }
}

export default connect(null, actions)(LibraryScreen);
