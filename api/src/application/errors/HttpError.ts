export default class HttpError extends Error {
  public readonly errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "Http Error";
    this.errorCode = errorCode;
  }
}