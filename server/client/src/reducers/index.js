import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bookProgressReducer from "./bookProgressReducer";

export default combineReducers({
  auth: authReducer,
  readingInfo: bookProgressReducer
});
