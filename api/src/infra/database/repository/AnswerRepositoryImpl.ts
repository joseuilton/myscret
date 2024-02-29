import AnswerRepository from "@application/repository/AnswerRepository";
import AnswerEntity from "@domain/entities/AnswerEntity";
import AnswerDAO from "../dao/AnswerDAO";
import { AnswerModel } from "@domain/models";

export default class AnswerRepositoryImpl implements AnswerRepository {
  constructor(private readonly answerDAO: AnswerDAO) {}

  toModel(answer: AnswerEntity): AnswerModel {
    return {
      answerId: answer.answerId,
      questionId: answer.questionId,
      userId: answer.userId,
      answer: answer.answer,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    } as AnswerModel;
  }

  toEntity(answer: AnswerModel): AnswerEntity {
    return new AnswerEntity(
      answer.answerId,
      answer.questionId,
      answer.userId,
      answer.answer,
      answer.createdAt,
      answer.updatedAt
    );
  }

  async create(answer: AnswerEntity): Promise<AnswerEntity> {
    await this.answerDAO.create(answer);
    return answer;
  }

  async listByQuestion(questionId: string): Promise<AnswerEntity[]> {
    const answers = await this.answerDAO.listByQuestion(questionId);
    const output = answers.map((answer) => this.toEntity(answer));
    return output;
  }
}