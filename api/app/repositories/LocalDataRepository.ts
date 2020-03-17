import LocalFileAccess from '../dataAccess/LocalFileAccess'

export default class LocalDataRepository {
  private _downloadedCache: LocalFileAccess

  constructor(_localStoragePath: string, _parsedStoragePath: string) {
    console.log('this is what I am getting: ')
    console.log(_localStoragePath)
    console.log(_parsedStoragePath)
    this._downloadedCache = new LocalFileAccess(
      _localStoragePath,
      _parsedStoragePath
    )
  }

  // Obtains the words from the parsed book
  retrieve(
    bookLocations: Array<string>,
    startWord: number,
    incrementValue: number
  ): Promise<string> {
    return this._downloadedCache.readFiles(
      bookLocations,
      startWord,
      incrementValue
    )
  }

  // Obtains the parsed book locations for the specific book name
  findById(bookName: string): string[] {
    return this._downloadedCache.getParsedFilesForBook(bookName)
  }
}
