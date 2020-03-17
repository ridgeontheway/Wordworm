import { GET_BOOK_CONTENTS } from '../actions/types'

export default function bookContentReducer(state = null, action) {
  switch (action.type) {
    case GET_BOOK_CONTENTS:
      console.log('this is what we are getting:', action.payload)
      return action.payload || false
    default:
      return state
  }
}
