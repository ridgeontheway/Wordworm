import React, { Component } from "react";
import Screen from "./Screen";
import "../styles.css";

export default class DashboardScreen extends Component {
  render() {
    return (
      <div className="main__container">
        <Screen
          libraryText="Open your library"
          uploadText="Save a new book"
          documentTitle="Home"
        />
      </div>
    );
  }
}
