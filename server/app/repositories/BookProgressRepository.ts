import { BaseRepository } from "./base/BaseRepository";
import { IBookProgression } from "../models/interfaces/IBookProgression";
import { schema as BookProgressSchema } from "../dataAccess/schemas/BookProgressSchema";

class BookProgressRepository extends BaseRepository<IBookProgression> {
  constructor() {
    console.log("this is the schema", BookProgressSchema);
    super(BookProgressSchema);
  }

  updateNumWordsRead(
    bookTitle: string,
    _userIDReading: string,
    numWordsRead: Number,
    callback: (error: any, result: IBookProgression) => void
  ) {
    this.retrieve(bookTitle, _userIDReading, (err, result) => {
      if (err) console.error(err);
      if (result) {
        result["wordsRead"] = numWordsRead;
        result.save(callback);
      } else return { FoundBook: false };
    });
  }

  // Retrieves a BookProgression model based on the unique combination of the user reading the book (userID) and the book they are reading (bookTitle)
  retrieve(
    bookTitle: string,
    _userIDReading: string,
    callback: (error: any, result: IBookProgression) => void
  ) {
    console.log("this is the booktitle", bookTitle);
    console.log("this is the title", _userIDReading);
    this._model.findOne(
      { title: bookTitle, userIDReading: _userIDReading },
      callback
    );
  }
}

Object.seal(BookProgressRepository);
export = BookProgressRepository;
