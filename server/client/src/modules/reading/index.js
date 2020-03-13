import React, { Component } from 'react'
import '../styles.css'
export default class ReadingScreen extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(
      'this is the title I am getting now??:',
      this.props.location.state.bookTitle
    )
    console.log(
      'this is the id that i am getting?',
      this.props.location.state.bookID
    )
  }
  render() {
    return (
      <div className="main__container">
        <h1>Hello world!</h1>
      </div>
    )
  }
}
