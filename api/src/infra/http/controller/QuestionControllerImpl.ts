import QuestionController from "@application/controller/QuestionController";
import CreateQuestion from "@application/usecases/questions/CreateQuestion";
import { Request, Response } from "express";

export default class QuestionControllerImpl implements QuestionController {
  async create(request: Request, response: Response): Promise<void> {
    const { userId, question } = request.body;
    const questionData = { userId, question };
    const newQuestion = await new CreateQuestion().execute(questionData);

    response.status(201).json({ question: newQuestion });
  }
}