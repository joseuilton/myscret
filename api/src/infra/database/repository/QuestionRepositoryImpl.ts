import QuestionRepository from "@application/repository/QuestionRepository";
import QuestionEntity from "@domain/entities/QuestionEntity";
import QuestionDAO from "../dao/QuestionDAO";
import { QuestionModel } from "@domain/models";

export default class QuestionRepositoryImpl implements QuestionRepository {
  constructor(private readonly questionDAO: QuestionDAO) {}

  toModel(question: QuestionEntity): QuestionModel {
    return {
      questionId: question.questionId,
      userId: question.userId,
      question: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    } as QuestionModel;
  }

  async create(question: QuestionEntity): Promise<QuestionEntity> {
    await this.questionDAO.create(this.toModel(question));
    return question;
  }
}