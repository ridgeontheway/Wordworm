import S3ManagementService from '../app/services/S3ManagementService'
import LocalDataManagementService from '../app/services/LocalDataManagementService'

class MultimediaController {
  private downloadedDataService: LocalDataManagementService
  private cloudDataService: S3ManagementService

  constructor() {
    this.downloadedDataService = new LocalDataManagementService()
    this.cloudDataService = new S3ManagementService()
  }

  // Uploads book to s3
  bookUpload(req, res) {
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
  }

  // Downloads specified book from s3 and retrieves the words specified (from startWordNumber -> incrementValue)
  retrieveWords(
    fileName: string,
    startWordNumber: number,
    incrementValue: number
  ) {
    // this.cloudDataService
    //   .getObject(fileName, this.downloadedDataService.getLocalStoragePath())
    //   .then(() => {
    //     this.downloadedDataService
    //       .getRequestedWords(fileName, startWordNumber, incrementValue)
    //       .then(requestedWords => {
    //         return requestedWords;
    //       });
    //   });
  }
}

export const controller = new MultimediaController()
