import { GET_DEFAULT_BOOK_PROGRESS } from "../actions/types";
// null = we are not sure if the user is logged in or not
// action.payload = the user model
export default function bookProgressReducer(state = null, action) {
  switch (action.type) {
    case GET_DEFAULT_BOOK_PROGRESS:
      // if the payload is empty, we return false
      return action.payload || false;
    default:
      return state;
  }
}
