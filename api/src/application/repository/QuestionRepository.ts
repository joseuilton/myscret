import QuestionEntity from "@domain/entities/QuestionEntity";

export default interface QuestionRepository {
  create(question: QuestionEntity): Promise<QuestionEntity>;
  get(questionId: string): Promise<QuestionEntity | null>;
  listByUser(userId: string): Promise<QuestionEntity[]>;
  delete(questionId: string): Promise<void>;
}