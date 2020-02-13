import { BaseDataService } from "./base/BaseDataService";
import { IUserModel } from "../../models/interfaces/IUserModel";

export interface IUserService extends BaseDataService<IUserModel> {
  addNewBookProgress(
    googleID: string,
    _idBookProgress: string,
    callback: (result: any) => void
  );
  retrieve(googleID: string, callback: (error: any, result: any) => void);
}
