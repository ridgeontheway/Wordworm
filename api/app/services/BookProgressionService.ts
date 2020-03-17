import { default as BookProgressRepository } from '../repositories/BookProgressRepository'
import { IBookProgressionService } from './interfaces/IBookProgressionService'
import { IBookProgression } from '../models/interfaces/IBookProgression'

export default class BookProgressionService implements IBookProgressionService {
  private _bookProgressionRepository: BookProgressRepository

  constructor() {
    this._bookProgressionRepository = new BookProgressRepository()
  }

  create(item: IBookProgression, callback: (error: any, result: any) => void) {
    this._bookProgressionRepository.create(item, callback)
  }

  retrieve(
    title: string,
    userIDReading: string,
    callback: (error: any, result: any) => void
  ) {
    this._bookProgressionRepository.retrieve(title, userIDReading, callback)
  }

  update(
    _id: string,
    item: IBookProgression,
    callback: (error: any, result: any) => void
  ) {
    this._bookProgressionRepository.findById(_id, (err, res) => {
      if (err) callback(err, res)
      else {
        this._bookProgressionRepository.update(res._id, item, callback)
      }
    })
  }

  updateNumWordsRead(
    bookTitle: string,
    userIDReading: string,
    numWordsRead: Number,
    callback: (error: any, result: any) => void
  ) {
    return this._bookProgressionRepository.updateNumWordsRead(
      bookTitle,
      userIDReading,
      numWordsRead,
      callback
    )
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._bookProgressionRepository.delete(_id, callback)
  }

  findById(
    _id: string,
    callback: (error: any, result: IBookProgression) => void
  ) {
    this._bookProgressionRepository.findById(_id, callback)
  }
}
