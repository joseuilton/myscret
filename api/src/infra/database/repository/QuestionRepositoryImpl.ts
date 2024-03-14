import QuestionRepository from "@application/repository/QuestionRepository";
import QuestionEntity from "@domain/entities/QuestionEntity";
import QuestionDAO from "../dao/QuestionDAO";
import { QuestionModel, UserModel } from "@domain/models";
import UserEntity from "@domain/entities/UserEntity";

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

  toEntity({ question,  user }: { question: QuestionModel, user?: UserModel }): QuestionEntity {
    return new QuestionEntity(
      question.questionId,
      question.userId,
      question.question,
      question.createdAt,
      question.updatedAt,
      user && new UserEntity(
        user.userId, user.name, user.username, user.pictureUrl, user.email, "", user.createdAt, 
        user.updatedAt
      )
    );
  }

  async create(question: QuestionEntity): Promise<QuestionEntity> {
    await this.questionDAO.create(this.toModel(question));
    return question;
  }

  async get(questionId: string): Promise<QuestionEntity | null> {
    const data = await this.questionDAO.findById(questionId);
    return data ? this.toEntity(data) : null;
  }

  async listByUser(userId: string): Promise<QuestionEntity[]> {
    const questions = await this.questionDAO.findByUser(userId);
    const output = questions.map((question) => this.toEntity({ question }));
    return output;
  }

  async delete(questionId: string): Promise<void> {
    await this.questionDAO.delete(questionId);
  }
}