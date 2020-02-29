import S3ManagementService from "../app/services/S3ManagementService";
import LocalDataManagementService from "../app/services/LocalDataManagementService";

class MultimediaController {
  private downloadedDataService: LocalDataManagementService;
  private cloudDataService: S3ManagementService;

  constructor() {
    this.downloadedDataService = new LocalDataManagementService();
    this.cloudDataService = new S3ManagementService();
  }

  // Uploads book to s3
  bookUpload(req, res, parameter: string) {
    const uploadInstance = this.cloudDataService.getUpload().single(parameter);
    uploadInstance(req, res, err => {
      if (err) console.error(err);
      return { fileURL: req.file.location };
    });
  }

  // Downloads specified book from s3 and retrieves the words specified (from startWordNumber -> incrementValue)
  retrieveWords(
    fileName: string,
    startWordNumber: number,
    incrementValue: number
  ) {
    this.cloudDataService
      .getObject(fileName, this.downloadedDataService.getLocalStoragePath())
      .then(() => {
        this.downloadedDataService
          .getRequestedWords(fileName, startWordNumber, incrementValue)
          .then(requestedWords => {
            return requestedWords;
          });
      });
  }
}

export const controller = new MultimediaController();
