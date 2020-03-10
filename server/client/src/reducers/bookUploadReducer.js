import { UPLOAD_STATUS } from '../actions/types'
export default function bookUploadReducer(state = null, action) {
  switch (action.type) {
    case UPLOAD_STATUS:
      return action.payload || false
    default:
      return state
  }
}
