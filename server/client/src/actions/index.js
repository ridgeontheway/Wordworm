import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  console.log(' this is the data that we are getting from the API = ')
  console.log(res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}
