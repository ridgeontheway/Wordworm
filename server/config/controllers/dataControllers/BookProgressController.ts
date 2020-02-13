import BookProgressionService from "../../../app/services/data/BookProgressionService";
import { IBookProgression } from "../../../app/models/interfaces/IBookProgression";
import BaseDataController from "./base/BaseDataController";

class BookProgressController
  implements BaseDataController<BookProgressionService> {
  private bookProgressionService: BookProgressionService;

  constructor() {
    this.bookProgressionService = new BookProgressionService();
  }

  create(
    titleInput: string,
    wordsRead: Number,
    userIDReading: string,
    callback: (error: any, result: any) => void
  ): void {
    try {
      var progression: IBookProgression = <IBookProgression>(<unknown>{
        title: titleInput,
        wordsRead: wordsRead,
        userIDReading: userIDReading
      });
      this.bookProgressionService.create(progression, callback);
    } catch (e) {
      console.error("there was an issue with the request:", e);
    }
  }

  update(
    bookTitle: string,
    userIDReading: string,
    numWordsRead: Number,
    callback: (error: any, result: any) => void
  ): void {
    try {
      this.bookProgressionService.updateNumWordsRead(
        bookTitle,
        userIDReading,
        numWordsRead,
        callback
      );
    } catch (e) {
      console.log("there was an error with the request", e);
    }
  }

  delete(_id: string): void {
    try {
      this.bookProgressionService.delete(_id, (error, result) => {
        if (error) return { error: error };
        else return { success: "yey :) " };
      });
    } catch (e) {
      console.log("there was an error with the request", e);
    }
  }

  retrieve(
    bookName: string,
    userID: string,
    callback: (error: any, result: any) => void
  ) {
    try {
      this.bookProgressionService.retrieve(bookName, userID, callback);
    } catch (e) {
      console.log("there was an error with the request ", e);
    }
  }

  findById(_id: string, callback: (error: any, result: any) => void) {
    try {
      this.bookProgressionService.findById(_id, callback);
    } catch (e) {
      console.log("there was an error with the request", e);
    }
  }
}

export const controller = new BookProgressController();
