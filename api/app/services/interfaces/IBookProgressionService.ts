import { BaseDataService } from "./base/BaseDataService";
import { IBookProgression } from "../../models/interfaces/IBookProgression";

export interface IBookProgressionService
  extends BaseDataService<IBookProgression> {
  updateNumWordsRead(
    title: string,
    userIDReading: string,
    numWordsRead: Number,
    callback: (error: any, result: any) => void
  );
  retrieve(
    title: string,
    userIDReading: string,
    callback: (error: any, result: IBookProgression) => void
  );
}
