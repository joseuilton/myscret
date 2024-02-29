import AnswerController from "@application/controller/AnswerController";
import CreateAnswer from "@application/usecases/answers/CreateAnswer";
import { Request, Response } from "express";

export default class AnswerControllerImpl implements AnswerController {
 async create(request: Request, response: Response): Promise<void> {
  const { questionId } = request.params;
  const { userId, answer } = request.body;

  const answerData = { questionId, userId, answer };
  const newAnswer = await new CreateAnswer().execute(answerData);
  response.status(201).json({ answer: newAnswer });
 }
}