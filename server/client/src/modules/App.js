import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/Header";
import * as actions from "../actions";
import Book from "../components/Book";
import DashboardScreen from "./dashboard";
import LoginScreen from "./login";
import UploadScreen from "./upload";

// this file represents all the top most app - view setup
class App extends Component {
  // the location that the initial ajax requests will be located in
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route exact path="/upload" component={UploadScreen} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, actions)(App);
