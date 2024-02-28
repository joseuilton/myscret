import { Request, Response } from "express";

export default interface QuestionController {
  create: (request: Request, response: Response) => Promise<void>;
}