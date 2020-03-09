import DataObjectService from '../app/services/DataObjectService'
import BaseObjectDataController from './base/BaseObjectDataController'

class BookDataController
  implements BaseObjectDataController<DataObjectService> {
  private cloudDataService: DataObjectService

  constructor() {
    this.cloudDataService = new DataObjectService()
  }

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

  // Uploads book to s3

  // Downloads specified book from s3 and retrieves the words specified (from startWordNumber -> incrementValue)
  retrieveWords(
    fileName: string,
    startWordNumber: number,
    incrementValue: number
  ) {}
}

export const controller = new BookDataController()
