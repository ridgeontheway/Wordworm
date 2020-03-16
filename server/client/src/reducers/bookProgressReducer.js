import { BOOK_PROGRESS } from '../actions/types'
// null = we are not sure if the user is logged in or not
// action.payload = the user model
export default function bookProgressReducer(state = null, action) {
  switch (action.type) {
    case BOOK_PROGRESS:
      console.log('this is what we are getting:', action.payload)
      var reducedData = []
      // Removing the ID and UserIDReading elements from the returned data
      action.payload.forEach(element => {
        const bookProgressInformation = {
          id: element['title'],
          title: element['title'].replace('-', ' '),
          wordsRead: element['wordsRead']
        }
        reducedData.push(bookProgressInformation)
      })
      return reducedData || false
    default:
      return state
  }
}
