import S3Access from '../dataAccess/S3Access'

export default class DataObjectRepository {
  private _dataAccess: S3Access

  constructor() {
    this._dataAccess = new S3Access()
  }

  create(req, res, callback: (error: any) => void) {
    this._dataAccess.uploadObject(req, res, callback)
  }

  retrieve(_fileName: string, _downloadPath: string): Promise<unknown> {
    return this._dataAccess.getObject(_fileName, _downloadPath)
  }
}
