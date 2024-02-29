import QuestionController from "@application/controller/QuestionController";
import CreateQuestion from "@application/usecases/questions/CreateQuestion";
import DeleteQuestion from "@application/usecases/questions/DeleteQuestion";
import ListByUserQuestion from "@application/usecases/questions/ListByUserQuestion";
import { Request, Response } from "express";

export default class QuestionControllerImpl implements QuestionController {
  async create(request: Request, response: Response): Promise<void> {
    const { userId, question } = request.body;
    const questionData = { userId, question };
    const newQuestion = await new CreateQuestion().execute(questionData);

    response.status(201).json({ question: newQuestion });
  }

  async listByUser(request: Request, response: Response): Promise<void> {
    const { userId } = request.params;
    const questions = await new ListByUserQuestion().execute(userId);
    
    response.status(200).json({ questions });
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { questionId } = request.params;
    await new DeleteQuestion().execute(questionId);

    response.status(204).send();
  }
}