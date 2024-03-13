import AnswerEntity from "@domain/entities/AnswerEntity";

export default interface AnswerRepository {
  create: (answer: AnswerEntity) => Promise<AnswerEntity>;
  get: (answerId: string) => Promise<AnswerEntity>;
  updateViewed: (answerId: string) => Promise<AnswerEntity | null>;
  listByUser: (userId: string) => Promise<AnswerEntity[]>;
  listAllByUserQuestions: (userId: string) => Promise<AnswerEntity[]>;
}