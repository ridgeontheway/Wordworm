import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './Header'
import * as actions from '../actions'
import Landing from './Landing'
import Book from './Book'

const DashBoard = () => <h2>DashBoard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

// this file represents all the top most app - view setup
class App extends Component {
  // the location that the initial ajax requests will be located in
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <Route exact path='/' component={Book} />
            <Route exact path='/surveys' component={DashBoard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
