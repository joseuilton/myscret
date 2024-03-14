import QuestionController from "@application/controller/QuestionController";
import CreateQuestion from "@application/usecases/questions/CreateQuestion";
import DeleteQuestion from "@application/usecases/questions/DeleteQuestion";
import GetQuestion from "@application/usecases/questions/GetQuestion";
import ListByUserQuestion from "@application/usecases/questions/ListByUserQuestion";
import { Request, Response } from "express";

export default class QuestionControllerImpl implements QuestionController {
  async create(request: Request, response: Response): Promise<void> {
    const user = JSON.parse(String(request.headers["user"]));
    const { question } = request.body;
    const questionData = { userId: user.userId, question };
    const newQuestion = await new CreateQuestion().execute(questionData);

    response.status(201).json({ question: newQuestion });
  }

  async get(request: Request, response: Response): Promise<void> {
    const { questionId } = request.params;
    const question = await new GetQuestion().execute(questionId);
    response.status(200).json({ question });
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