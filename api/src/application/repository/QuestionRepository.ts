import QuestionEntity from "@domain/entities/QuestionEntity";

export default interface QuestionRepository {
  create(question: QuestionEntity): Promise<QuestionEntity>;
}