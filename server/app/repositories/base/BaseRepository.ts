import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";
import mongoose from "mongoose";

export abstract class BaseRepository<T extends mongoose.Document>
  implements IWrite<T>, IRead<T> {
  public _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: mongoose.Document[]) => void) {
    this._model.create(item, callback);
  }

  update(
    _id: mongoose.Types.ObjectId,
    item: T,
    callback: (error: any, result: any) => void
  ) {
    this._model.update({ _id: _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, err =>
      callback(err, null)
    );
  }

  findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}
