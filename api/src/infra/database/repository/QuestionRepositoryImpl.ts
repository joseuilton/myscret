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

  toEntity(question: QuestionModel): QuestionEntity {
    return new QuestionEntity(
      question.questionId,
      question.userId,
      question.question,
      question.createdAt,
      question.updatedAt
    );
  }

  async create(question: QuestionEntity): Promise<QuestionEntity> {
    await this.questionDAO.create(this.toModel(question));
    return question;
  }

  async listByUser(userId: string): Promise<QuestionEntity[]> {
    const questions = await this.questionDAO.findByUser(userId);
    const output = questions.map((question) => this.toEntity(question));
    return output;
  }
}