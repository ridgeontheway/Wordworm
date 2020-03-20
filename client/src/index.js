import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import App from './containers/App'
// this file is going to represent all the top layer data, or redux layer setup
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
// if the state changes in the store, the provider tag will update all its children of the data change, updating where necessary
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
