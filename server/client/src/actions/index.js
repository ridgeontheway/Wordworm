import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  console.log(" this is the data that we are getting from the API = ");
  console.log(res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const uploadBook = _formData => async dispatch => {
  axios({
    method: "post",
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=--------------------------639798589758857053697921"
    },
    url: "/api/file-upload",
    data: _formData
  })
    .then(response => {
      console.log("this is the response");
      console.log(response);
    })
    .catch(err => {
      console.log("this is an error", err);
      console.error(err);
    });
};
