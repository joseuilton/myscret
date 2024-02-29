import { Request, Response } from "express";

export default interface AnswerController {
  create: (request: Request, response: Response) => Promise<void>;
  listByQuestion: (request: Request, response: Response) => Promise<void>;
}