import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bookProgressReducer from './bookProgressReducer'
import bookUploadReducer from './bookUploadReducer'

export default combineReducers({
  auth: authReducer,
  readingInfo: bookProgressReducer,
  bookUpload: bookUploadReducer
})
