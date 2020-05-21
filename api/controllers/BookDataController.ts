import DataObjectService from '../app/services/DataObjectService'
import CachedDataService from '../app/services/CachedDataService'
import BaseObjectDataController from './base/BaseObjectDataController'
import { dirname } from 'path'

class BookDataController
  implements BaseObjectDataController<DataObjectService> {
  private cloudDataService: DataObjectService
  private downloadedDataService: CachedDataService
  private _localDataStoragePath: string
  private _localParsedDataStoragePath: string

  constructor() {
    // Setting location of parsed books
    const rootDirectory = dirname(require.main.filename)
    this._localDataStoragePath = rootDirectory + '/app/dataAccess/data'
    this._localParsedDataStoragePath =
      rootDirectory + '/app/dataAccess/parsedBooks'

    this.cloudDataService = new DataObjectService()
    this.downloadedDataService = new CachedDataService(
      this._localDataStoragePath,
      this._localParsedDataStoragePath
    )
  }

  // Uploads Specified book to S3
  create(req, res): void {
    try {
      this.cloudDataService.create(req, res, error => {
        if (error) {
          console.error(error)
          res.json({ error: error })
        } else {
          if (req.file === undefined) {
            console.error('ERROR: no file defined!')
            res.json('No file selected')
          } else {
            const imageName = req.file.key
            const imageLocation = req.file.location
            res.json({
              image: imageName,
              location: imageLocation
            })
          }
        }
      })
    } catch (e) {
      console.error('there was an issue with the request:', e)
    }
  }

  // Downloads specified book from s3 and retrieves the words specified (from startWordNumber -> incrementValue)
  retrieve(
    res,
    fileName: string,
    startWordNumber: number,
    incrementValue: number
  ) {
    try {
      this.cloudDataService
        .retrieve(fileName, this._localDataStoragePath)
        .then(() => {
          this.downloadedDataService
            .retrieve(fileName + '.epub', startWordNumber, incrementValue)
            .then(requestedWords => {
              console.log('I am sending back now', requestedWords)
              res.send(requestedWords)
            })
        })
    } catch (e) {
      console.log(e)
    }
  }
}

export const controller = new BookDataController()
