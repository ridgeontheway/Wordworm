import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Screen from "./Screen";
import "../styles.css";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      pathname: "/"
    };
    this.handleOnLibraryPress = this.handleOnLibraryPress.bind(this);
    this.handleOnSavePress = this.handleOnSavePress.bind(this);
  }

  handleOnLibraryPress() {
    this.setState({ redirect: true, pathname: "/library" });
  }

  handleOnSavePress() {
    this.setState({ redirect: true, pathname: "/upload" });
  }

  render() {
    return (
      <div className="main__container">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: this.state.pathname
            }}
          />
        ) : (
          <Screen
            libraryText="Open your library"
            uploadText="Save a new book"
            documentTitle="Home"
            handleSaveBook={this.handleOnSavePress}
            handleLibrary={this.handleOnLibraryPress}
          />
        )}
      </div>
    );
  }
}
