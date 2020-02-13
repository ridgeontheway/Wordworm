import fs from "fs";
import EpubToTextService from "./EpubToTextService";
import * as readline from "readline";
import { ILocalDataService } from "./interfaces/ILocalDataService";

export default class LocalDataManagementService implements ILocalDataService {
  private readonly LOCAL_STORAGE_PATH = "./localData/";
  private readonly LOCAL_PARSED_PATH = "./localData/parsedBooks/";
  private epubParserService: EpubToTextService;

  constructor() {
    this.initializeDataFolder();
    this.epubParserService = new EpubToTextService();
  }

  getLocalStoragePath(): string {
    return this.LOCAL_STORAGE_PATH;
  }

  public async getRequestedWords(
    fileName: string,
    startWord: number,
    incrementValue: number
  ) {
    return new Promise((resolve, reject) => {
      // Writing epub to .txt
      this.epubParserService.extractTo(
        this.LOCAL_STORAGE_PATH + fileName,
        this.LOCAL_PARSED_PATH,
        err => {}
      );

      var bookLocations: Array<string> = this.getParsedFilesForBook(fileName);
      var wordsSelectedFromLocations = this.readFiles(
        bookLocations,
        startWord,
        incrementValue
      );
      resolve(wordsSelectedFromLocations);
    });
  }

  private async readFiles(
    bookLocations: Array<string>,
    startWord: number,
    incrementValue: number
  ) {
    var wordsSelectedFromLocations: string = "";
    var wordsLeftToRetrieve = incrementValue;

    for (let location of bookLocations) {
      var readingInfo: any = await this.getWordsFromParsedLocation(
        startWord,
        wordsLeftToRetrieve,
        this.LOCAL_PARSED_PATH + location
      );
      wordsSelectedFromLocations += readingInfo.retrievedWords;
      wordsLeftToRetrieve = readingInfo.wordsLeftToRetrieve;
    }
    return wordsSelectedFromLocations;
  }
  private getParsedFilesForBook(fileName: string) {
    var strippedFileName = fileName.split(".").shift();
    var parsedBookLocations: Array<string> = new Array();
    var files = fs.readdirSync(this.LOCAL_PARSED_PATH);

    files.forEach(file => {
      var strippedParsedFileName = file.split(".").shift();
      strippedParsedFileName = strippedParsedFileName!.substring(
        strippedParsedFileName!.indexOf("-") + 1
      );

      if (strippedParsedFileName === strippedFileName) {
        console.log("adding: " + file);
        parsedBookLocations.push(file);
      }
    });

    return parsedBookLocations;
  }

  private getWordsFromParsedLocation(
    startWord: number,
    wordsToRetrieve: number,
    fileLocation: string
  ) {
    return new Promise((resolve, reject) => {
      var retrievedWords: string = "";
      var wordsLeftToRetrieve = wordsToRetrieve;

      const readStream = fs.createReadStream(fileLocation);
      var lineReader = readline.createInterface({
        input: readStream
      });
      lineReader.on("line", line => {
        if (wordsLeftToRetrieve > 0) {
          var wordsInLine = line.split(" ").length;
          if (!(line.trim() === "")) {
            console.log("this is the line we are looking at: " + line);
            retrievedWords += "\n" + line;
            wordsLeftToRetrieve = wordsLeftToRetrieve - wordsInLine;
          }
        } else {
          readStream.destroy();
          lineReader.close();
        }
      });

      lineReader.on("close", () => {
        console.log("I am getting called here?");
        resolve({ wordsLeftToRetrieve, retrievedWords });
      });
    });
  }

  private initializeDataFolder() {
    if (!fs.existsSync(this.LOCAL_STORAGE_PATH)) {
      fs.mkdirSync(this.LOCAL_STORAGE_PATH);
    }
    if (!fs.existsSync(this.LOCAL_PARSED_PATH)) {
      fs.mkdirSync(this.LOCAL_PARSED_PATH);
    }
  }
}
