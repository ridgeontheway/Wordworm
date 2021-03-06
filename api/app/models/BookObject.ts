import { IBookObject } from './interfaces/IBookObject'

export default class BookObject {
  private _bookObject: IBookObject

  constructor(bookProgression: IBookObject) {
    this._bookObject = bookProgression
  }

  get title(): String {
    return this._bookObject.title
  }
}
