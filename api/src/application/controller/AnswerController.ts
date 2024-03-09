import { Request, Response } from "express";

export default interface AnswerController {
  create: (request: any, response: any) => Promise<void>;
  listByQuestion: (request: any, response: any) => Promise<void>;
  listByUserQuestions: (request: any, response: any) => Promise<void>;
}