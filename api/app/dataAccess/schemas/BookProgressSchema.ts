import * as mongoose from "mongoose";
import { IBookProgression } from "../../models/interfaces/IBookProgression";

class BookProgressSchema {
  static get schema() {
    let schema = new mongoose.Schema({
      title: {
        type: String,
        required: "title is required"
      },
      wordsRead: {
        type: Number,
        required: "wordsRead is required"
      },
      userIDReading: {
        type: String,
        required: true
      }
    });
    return schema;
  }
}

export const schema = mongoose.model<IBookProgression>(
  "UserBookProgression",
  BookProgressSchema.schema
);
