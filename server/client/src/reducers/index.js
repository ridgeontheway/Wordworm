import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bookProgressReducer from './bookProgressReducer'
import bookUploadReducer from './bookUploadReducer'
import bookContentReducer from './bookContentReducer'

export default combineReducers({
  auth: authReducer,
  readingInfo: bookProgressReducer,
  bookUpload: bookUploadReducer,
  bookContent: bookContentReducer
})
