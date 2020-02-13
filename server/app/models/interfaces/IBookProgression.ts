import { Document } from "mongoose";

export interface IBookProgression extends Document {
  title: String;
  wordsRead: Number;
  userIDReading: String;
}
