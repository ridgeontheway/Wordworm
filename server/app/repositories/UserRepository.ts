import { BaseRepository } from "./base/BaseRepository";
import { IUserModel } from "../models/interfaces/IUserModel";
import { schema as UserSchema } from "../dataAccess/schemas/UserSchema";
import mongoose from "mongoose";

class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(UserSchema);
  }

  addNewBookProgress(
    googleID: string,
    _idBookProgress: string,
    callback: (result: IUserModel) => void
  ) {
    this.retrieve(googleID, (err, result) => {
      if (err) console.error(err);
      if (result) {
        result["currentlyReading"].push(_idBookProgress);
        result.save().then(callback);
      }
    });
  }

  // Retrieves a UserModel based on the user's unique googleID
  retrieve(
    _googleID: string,
    callback: (error: any, result: IUserModel) => void
  ) {
    this._model.findOne({ googleID: _googleID }, callback);
  }
}

Object.seal(UserRepository);
export = UserRepository;
