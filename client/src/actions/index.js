import axios from 'axios'
import {
  FETCH_USER,
  GET_BOOK_CONTENTS,
  UPLOAD_STATUS,
  BOOK_PROGRESS,
  PROCESS_SPEECH_DATA
} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  console.log(' this is the data that we are getting from the API = ')
  console.log(res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const getWordsFromBook = _bookID => async dispatch => {
  const params = {
    bookName: _bookID,
    startWord: '0',
    incrementValue: '10'
  }
  console.log(params)
  const res = await axios.get('/api/word-retrieval', { params })
  dispatch({ type: GET_BOOK_CONTENTS, payload: res.data })
}

export const fetchCurrentlyReading = _currentUserSignedIn => async dispatch => {
  const currentlyReading = _currentUserSignedIn['currentlyReading']
  const request = '/api/retrieve-book-progress'
  // The requests for all the book info
  const requests = currentlyReading.map(documentID => {
    const params = {
      id: documentID
    }
    return axios.get(request, { params })
  })
  const res = await axios.all(requests)
  // The data contained in the api response
  const returnData = res.map(currentResponse => {
    return currentResponse.data
  })
  dispatch({ type: BOOK_PROGRESS, payload: returnData })
}

export const processSpeechData = _data => async dispatch => {
  const resultsArr = _data['results']
  // Extracting the alternatives form the responses
  const speechAlternativesArr = resultsArr.map(speechResult => {
    return speechResult['alternatives']
  })
  // Extracting the [words, confidence] values received by the API for each speechElement returned
  const spokenWordsArr = speechAlternativesArr.map(speechElement => {
    const result = speechElement.map(element => {
      return { words: element['words'], confidence: element['confidence'] }
    })
    return result
  })
  // Iterating through all spokenWords, extracting the necessary info
  const processedSpeechData = spokenWordsArr.map(spokenWordObj => {
    const processedUtterance = spokenWordObj.map(speechUtterance => {
      const confidence = speechUtterance['confidence']
      const wordsArr = speechUtterance['words'].map(spokenWordsObj => {
        return spokenWordsObj['word'].toLowerCase()
      })
      return { wordArr: wordsArr, confidence: confidence }
    })
    return processedUtterance
  })
  dispatch({ type: PROCESS_SPEECH_DATA, payload: processedSpeechData })
}

export const uploadBook = (_formData, _fileName) => async dispatch => {
  axios({
    method: 'post',
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${_formData._boundary}`
    },
    url: '/api/file-upload',
    data: _formData
  })
    .then(response => {
      const imageLocation = response.data.location
      const uploadSuccess = imageLocation ? true : false
      if (uploadSuccess) {
        // Splitting the file-name from its extension
        const fileName = _fileName.split('.')[0]
        axios({
          method: 'post',
          url: '/api/create-book-progress?bookName=' + fileName
        }).then(currentlyReading => {
          console.log(
            'this is what we are currently reading!: ',
            currentlyReading
          )
          dispatch({ type: UPLOAD_STATUS, payload: uploadSuccess })
        })
      }
    })
    .catch(err => {
      console.log('this is an error', err)
      console.error(err)
    })
}

export const resetUploadStatus = () => async dispatch => {
  dispatch({ type: UPLOAD_STATUS, payload: false })
}

export const clearSpeechData = () => async dispatch => {
  dispatch({ type: PROCESS_SPEECH_DATA, payload: false })
}
