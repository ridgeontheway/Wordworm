import * as mongoose from "mongoose";
import { IUserModel } from "../../models/interfaces/IUserModel";

class UserSchema {
  static get schema() {
    let schema = new mongoose.Schema({
      googleID: {
        type: String,
        required: true
      },
      currentlyReading: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserBookProgression"
        }
      ]
    });
    return schema;
  }
}

export const schema = mongoose.model<IUserModel>("User", UserSchema.schema);
