import AnswerController from "@application/controller/AnswerController";
import CreateAnswer from "@application/usecases/answers/CreateAnswer";
import ListAllAnswersByUserQuestions from "@application/usecases/answers/ListAllAnswersByUserQuestions";
import ListByQuestionAnswers from "@application/usecases/answers/ListByQuestionAnswers";
import { Request, Response } from "express";

export default class AnswerControllerImpl implements AnswerController {
 async create(request: Request, response: Response): Promise<void> {
  const { questionId } = request.params;
  const { userId, answer } = request.body;

  const answerData = { questionId, userId, answer };
  const newAnswer = await new CreateAnswer().execute(answerData);
  response.status(201).json({ answer: newAnswer });
 }

 async listByQuestion(request: Request, response: Response): Promise<void> {
  const { questionId } = request.params;

  const answers = await new ListByQuestionAnswers().execute(questionId);
  response.status(200).json({ answers });
 }

 async listByUserQuestions(request: Request, response: Response): Promise<void> {
  const user = JSON.parse(String(request.headers["user"]));
  
  const answers = await new ListAllAnswersByUserQuestions().execute(user.userId);
  response.status(200).json({ answers });
 }
}