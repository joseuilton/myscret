import HttpError from "@application/errors/HttpError";
import { NextFunction, Request, Response,  } from "express";

export default class ErrorsMiddleware {
  static handle(
    error: HttpError, request: Request, response: Response, next: NextFunction
  ): Response {
    if (!(error instanceof HttpError)) {
      return response.status(500).json({ messageError: error });
    }

    return response.status(error.errorCode).json({ messageError: error.message });
  }
}