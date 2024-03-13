import AnswerController from "@application/controller/AnswerController";
import CreateAnswer from "@application/usecases/answers/CreateAnswer";
import GetAnswer from "@application/usecases/answers/GetAnswer";
import ListAllAnswersByUserQuestions from "@application/usecases/answers/ListAllAnswersByUserQuestions";
import ListAnswersByUser from "@application/usecases/answers/ListAnswersByUser";
import { Request, Response } from "express";

export default class AnswerControllerImpl implements AnswerController {
 async create(request: Request, response: Response): Promise<void> {
  const { questionId } = request.params;
  const { username, answer } = request.body;

  const answerData = { questionId, username, answer };
  const newAnswer = await new CreateAnswer().execute(answerData);
  response.status(201).json({ answer: newAnswer });
 }

 async listByUserQuestions(request: Request, response: Response): Promise<void> {
  const user = JSON.parse(String(request.headers["user"]));
  
  const answers = await new ListAllAnswersByUserQuestions().execute(user.userId);
  response.status(200).json({ answers });
 }

 async listByUser(request: Request, response: Response): Promise<void> {
  const user = JSON.parse(String(request.headers["user"]));
  const answers = await new ListAnswersByUser().execute(user.userId);
  response.status(200).json(answers);
 }

 async getAnswer(request: Request, response: Response): Promise<void> {
  const user = JSON.parse(String(request.headers["user"]));
  const { answerId } = request.params;
  const answer = await new GetAnswer().execute({ answerId, userId: user.userId });
  response.status(200).json(answer);
 }
}