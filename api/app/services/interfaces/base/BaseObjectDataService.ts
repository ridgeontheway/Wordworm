export interface BaseObjectDataService<T> {
  create: (req, res, callback: (error: any) => void) => void
}
