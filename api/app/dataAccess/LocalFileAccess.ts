import * as readline from 'readline'
import fs from 'fs'

export default class LocalFileAccess {
  private _localStoragePath: string
  private _parsedStoragePath: string

  constructor(_localStoragePath: string, _parsedStoragePath: string) {
    this._localStoragePath = _localStoragePath + '/'
    this._parsedStoragePath = _parsedStoragePath + '/'
    this.initializeDataFolder()
  }

  public async readFiles(
    bookLocations: Array<string>,
    startWord: number,
    incrementValue: number
  ) {
    var wordsSelectedFromLocations: string = ''
    var wordsLeftToRetrieve = incrementValue

    for (let location of bookLocations) {
      var readingInfo: any = await this.getWordsFromParsedLocation(
        startWord,
        wordsLeftToRetrieve,
        this._parsedStoragePath + location
      )
      wordsSelectedFromLocations += readingInfo.retrievedWords
      wordsLeftToRetrieve = readingInfo.wordsLeftToRetrieve
    }
    return wordsSelectedFromLocations
  }

  public getParsedFilesForBook(fileName: string) {
    var strippedFileName = fileName.split('.').shift()
    var parsedBookLocations: Array<string> = new Array()
    var files = fs.readdirSync(this._parsedStoragePath)

    files.forEach(file => {
      var strippedParsedFileName = file.split('.').shift()
      strippedParsedFileName = strippedParsedFileName!.substring(
        strippedParsedFileName!.indexOf('-') + 1
      )

      if (strippedParsedFileName === strippedFileName) {
        console.log('adding: ' + file)
        parsedBookLocations.push(file)
      }
    })

    return parsedBookLocations
  }

  public getWordsFromParsedLocation(
    startWord: number,
    wordsToRetrieve: number,
    fileLocation: string
  ) {
    return new Promise((resolve, reject) => {
      var retrievedWords: string = ''
      var wordsLeftToRetrieve = wordsToRetrieve

      const readStream = fs.createReadStream(fileLocation)
      var lineReader = readline.createInterface({
        input: readStream
      })
      lineReader.on('line', line => {
        if (wordsLeftToRetrieve > 0) {
          var wordsInLine = line.split(' ').length
          if (!(line.trim() === '')) {
            // regex to replace anything around [] or ()
            const replaceHardBrackets = line.replace(/ *\[[^)]*\] */g, '')
            // regex to replace placeholder images
            const replaceImageLeftOvers = replaceHardBrackets.replace(
              /(.*)\.[^.]+$/,
              ''
            )
            if (replaceImageLeftOvers) {
              retrievedWords += '\n' + replaceImageLeftOvers
              wordsLeftToRetrieve = wordsLeftToRetrieve - wordsInLine
            }
          }
        } else {
          readStream.destroy()
          lineReader.close()
        }
      })

      lineReader.on('close', () => {
        resolve({ wordsLeftToRetrieve, retrievedWords })
      })
    })
  }

  private initializeDataFolder() {
    if (!fs.existsSync(this._localStoragePath)) {
      fs.mkdirSync(this._localStoragePath)
    }
    if (!fs.existsSync(this._parsedStoragePath)) {
      fs.mkdirSync(this._parsedStoragePath)
    }
  }
}
