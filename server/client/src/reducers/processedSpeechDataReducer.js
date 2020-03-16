import { PROCESS_SPEECH_DATA } from '../actions/types'
export default function processedSpeechDataReducer(state = null, action) {
  switch (action.type) {
    case PROCESS_SPEECH_DATA:
      return action.payload || false
    default:
      return state
  }
}
