import S3Access from '../dataAccess/S3Access'

class DataObjectRepository {
  private _dataAccess

  constructor() {
    this._dataAccess = new S3Access()
  }

  create(req, res, callback: (error: any) => void) {
    this._dataAccess.uploadObject(req, res, callback)
  }
}

Object.seal(DataObjectRepository)
export = DataObjectRepository
