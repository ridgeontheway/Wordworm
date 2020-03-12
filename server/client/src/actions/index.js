import axios from 'axios'
import $ from 'jquery'
import {
  FETCH_USER,
  GET_DEFAULT_BOOK_PROGRESS,
  UPLOAD_STATUS,
  BOOK_PROGRESS
} from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  console.log(' this is the data that we are getting from the API = ')
  console.log(res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const getWordsFromBook = () => async dispatch => {
  const params = {
    bookName: 'moby-dick',
    startWord: '0',
    incrementValue: '10'
  }
  console.log(params)
  const res = await axios.get('/api/word-retrieval', { params })
  console.log(res)
}

export const fetchCurrentlyReading = _currentUserSignedIn => async dispatch => {
  const currentlyReading = _currentUserSignedIn['currentlyReading']
  const request = '/api/retrieve-book-progress'
  // The requests for all the book info
  var requests = []
  // The data contained in the api response
  var returnData = []

  currentlyReading.forEach(documentID => {
    const params = {
      id: documentID
    }
    requests.push(axios.get(request, { params }))
  })
  const res = await axios.all(requests)
  res.forEach(response => {
    returnData.push(response.data)
  })
  dispatch({ type: BOOK_PROGRESS, payload: returnData })
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
