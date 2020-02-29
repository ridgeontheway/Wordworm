import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Screen from "./Screen";
import "../styles.css";
class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  handleSignIn() {
    this.setState({ redirect: true });
  }
  render() {
    return (
      <div className="main__container">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: "/dashboard"
            }}
          />
        ) : (
          <Screen
            loginMicrophoneTitle="State of the art speech processing"
            loginMicrophoneDescription="..."
            loginCloudTitle="Sync your progress across devices"
            loginCloudDescription="..."
            loginDBTitle="Privacy first: no speech data is stored"
            loginDbDescription="..."
            handleSignIn={this.handleSignIn}
            OAUTHFlow={"/auth/google"}
          />
        )}
      </div>
    );
  }
}

export default connect(null, actions)(LoginScreen);
