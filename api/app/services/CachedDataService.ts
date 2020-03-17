import { default as LocalDataRepository } from '../repositories/LocalDataRepository'
import { BaseCacheDataService } from './interfaces/base/BaseCacheDataService'
import EpubToTextService from './EpubToTextService'

export default class CachedDataService implements BaseCacheDataService<any> {
  private _localDataRepository: LocalDataRepository
  private _epubParserService: EpubToTextService
  private _localDataStoragePath: string
  private _localParsedStoragePath: string

  constructor(dataStoragePath: string, parsedStoragePath: string) {
    // setting file-path for cached files
    this._localDataStoragePath = dataStoragePath
    this._localParsedStoragePath = parsedStoragePath
    console.log(this._localDataStoragePath)
    console.log(this._localParsedStoragePath)
    this._localDataRepository = new LocalDataRepository(
      this._localDataStoragePath,
      this._localParsedStoragePath
    )
    this._epubParserService = new EpubToTextService()
  }

  retrieve(
    _fileName: string,
    startWord: number,
    incrementValue: number
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._epubParserService.extractTo(
        this._localDataStoragePath + '/' + _fileName,
        this._localParsedStoragePath + '/',
        () => {
          const bookLocations: Array<string> = this._localDataRepository.findById(
            _fileName
          )
          this._localDataRepository
            .retrieve(bookLocations, startWord, incrementValue)
            .then(wordsSelectedFromLocations => {
              resolve(wordsSelectedFromLocations)
            })
        }
      )
    })
  }
}
