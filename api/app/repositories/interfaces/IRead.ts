export interface IRead<T> {
  findById: (id: string, callback: (error: any, result: T) => void) => void;
}
