import { IBookProgression } from "./interfaces/IBookProgression";

class BookProgression {
  private _bookProgression: IBookProgression;

  constructor(bookProgression: IBookProgression) {
    this._bookProgression = bookProgression;
  }

  get title(): String {
    return this._bookProgression.title;
  }

  get wordsRead(): Number {
    return this._bookProgression.wordsRead;
  }

  get userIDReading(): String {
    return this._bookProgression.userIDReading;
  }
}

Object.seal(BookProgression);
export = BookProgression;
