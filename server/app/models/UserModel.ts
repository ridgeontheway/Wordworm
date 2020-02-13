import { IUserModel } from "./interfaces/IUserModel";

class UserModel {
  private _userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }

  get googleID(): String {
    return this._userModel.googleID;
  }

  get currentlyReading(): Array<String> {
    return this._userModel.currentlyReading;
  }
}

Object.seal(UserModel);
export = UserModel;
