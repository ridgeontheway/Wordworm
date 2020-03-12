export interface BaseCacheDataService<T> {
  retrieve: (
    _fileName: string,
    startWordNumber: number,
    incrementValue: number
  ) => Promise<unknown>
}
