import React, { Component } from "react";
import Screen from "./Screen";
import "../styles.css";
export default class LoginScreen extends Component {
  render() {
    return (
      <div className="main__container">
        <Screen
          loginMicrophoneTitle="State of the art speech processing"
          loginMicrophoneDescription="..."
          loginCloudTitle="Sync your progress across devices"
          loginCloudDescription="..."
          loginDBTitle="Privacy first: no speech data is stored"
          loginDbDescription="..."
        />
      </div>
    );
  }
}
