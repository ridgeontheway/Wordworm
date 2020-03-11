import axios from 'axios'
import $ from 'jquery'
import { FETCH_USER, GET_DEFAULT_BOOK_PROGRESS, UPLOAD_STATUS } from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  console.log(' this is the data that we are getting from the API = ')
  console.log(res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchCurrentlyReading = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  const currentlyReadingDocumentID = res.data.currentlyReading
  if (currentlyReadingDocumentID[0]) {
    const currentlyReading = await axios.get(
      '/api/retrieve-book-progress?id=' + currentlyReadingDocumentID[0]
    )
    var bookTitle = currentlyReading.data.title
    var wordsRead = currentlyReading.data.wordsRead
    const readingData = { words: wordsRead, title: bookTitle }
    dispatch({ type: GET_DEFAULT_BOOK_PROGRESS, payload: readingData })
  } else {
    // If there is no entry created -- we create one with a default value of (wordsRead = 0)
    axios({
      method: 'get',
      url: '/api/create-book-progress?bookName=Moby%20Dick'
    }).then(currentlyReading => {
      var bookTitle = currentlyReading.data.title
      var wordsRead = currentlyReading.data.wordsRead
      const readingData = { words: wordsRead, title: bookTitle }
      dispatch({ type: GET_DEFAULT_BOOK_PROGRESS, payload: readingData })
    })
  }
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
