import { Document } from "mongoose";

export interface IUserModel extends Document {
  googleID: String;
  currentlyReading: Array<String>;
}
