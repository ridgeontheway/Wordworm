import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/Header";
import * as actions from "../actions";
import Book from "../components/Book";
import DashboardScreen from "./dashboard";
import LoginScreen from "./login";

// this file represents all the top most app - view setup
class App extends Component {
  // the location that the initial ajax requests will be located in
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <LoginScreen />
      </div>
    );
  }
}

export default connect(null, actions)(App);
