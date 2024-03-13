import AnswerRepository from "@application/repository/AnswerRepository";
import AnswerEntity from "@domain/entities/AnswerEntity";
import AnswerDAO from "../dao/AnswerDAO";
import { AnswerModel, QuestionModel, UserModel } from "@domain/models";
import UserEntity from "@domain/entities/UserEntity";
import QuestionEntity from "@domain/entities/QuestionEntity";

export default class AnswerRepositoryImpl implements AnswerRepository {
  constructor(private readonly answerDAO: AnswerDAO) { }

  toModel(answer: AnswerEntity): AnswerModel {
    return {
      answerId: answer.answerId,
      questionId: answer.questionId,
      userId: answer.userId,
      answer: answer.answer,
      viewedByQuestionOwner: answer.viewedByQuestionOwner,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    } as AnswerModel;
  }

  toEntity(
    { answer, user, question }: { answer: AnswerModel, user?: UserModel | null, question?: QuestionModel}
  ): AnswerEntity {
    return new AnswerEntity(
      answer.answerId,
      answer.questionId,
      answer.userId,
      answer.answer,
      answer.viewedByQuestionOwner,
      answer.createdAt,
      answer.updatedAt,
      user
        ? new UserEntity(
            user.userId, user.name, user.username, user.pictureUrl, user.email, user.password, user.createdAt, user.updatedAt
          )
        : null,
      question
        ? new QuestionEntity(
          question.questionId, question.userId, question.question, question.createdAt, question.updatedAt
          )
        : null,
    );
  }

  async create(answer: AnswerEntity): Promise<AnswerEntity> {
    await this.answerDAO.create(this.toModel(answer));
    return answer;
  }

  async get(answerId: string): Promise<AnswerEntity> {
    const answer = await this.answerDAO.get(answerId);
    const output = this.toEntity(answer);
    return output;
  }

  async updateViewed(answerId: string): Promise<AnswerEntity | null> {
    const answer = await this.answerDAO.updateViewed(answerId);
    return answer ? this.toEntity({ answer }) : null;
  }

  async listAllByUserQuestions(userId: string): Promise<AnswerEntity[]> {
    const answers = await this.answerDAO.listAllByUserQuestions(userId);
    const output = answers.map((answer) => this.toEntity(answer));
    return output;
  }

  async listByUser(userId: string): Promise<AnswerEntity[]> {
    const answers = await this.answerDAO.listByUser(userId);
    const output = answers.map((answer) => this.toEntity(answer));
    return output;
  }
}