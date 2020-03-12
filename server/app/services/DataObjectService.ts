import { default as ObjectRepository } from '../repositories/DataObjectRepository'
import { BaseObjectDataService } from './interfaces/base/BaseObjectDataService'
export default class DataObjectService implements BaseObjectDataService<any> {
  private _dataObjectRepository: ObjectRepository

  constructor() {
    this._dataObjectRepository = new ObjectRepository()
  }

  create(req, res, callback: (error: any) => void) {
    this._dataObjectRepository.create(req, res, callback)
  }

  retrieve(_fileName: string, _downloadPath: string): Promise<unknown> {
    return this._dataObjectRepository.retrieve(_fileName, _downloadPath)
  }
}
