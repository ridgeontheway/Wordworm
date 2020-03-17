export interface ILocalDataService {
  getRequestedWords(
    fileName: string,
    startWord: number,
    incrementValue: number
  );
  getLocalStoragePath(): string;
}
