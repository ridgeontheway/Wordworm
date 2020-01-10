import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

// this file is going to represent all the top layer data, or redux layer setup

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
// if the state changes in the store, the provider tag will update all its children of the data change, updating where necessary
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'))
