import { FETCH_USER } from '../actions/types'
// null = we are not sure if the user is logged in or not
// action.payload = the user model
export default function authReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // if the payload is empty, we return false
      return action.payload || false
    default:
      return state
  }
}
