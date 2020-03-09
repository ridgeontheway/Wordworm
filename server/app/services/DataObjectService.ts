import aws from 'aws-sdk'
import multer from 'multer'
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
}
