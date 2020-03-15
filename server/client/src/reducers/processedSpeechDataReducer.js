import { PROCESS_SPEECH_DATA } from '../actions/types'
export default function processedSpeechDataReducer(state = null, action) {
  switch (action.type) {
    case PROCESS_SPEECH_DATA:
      console.log('this is the data: ', action.payload)
      return action.payload || false
    default:
      return state
  }
}
