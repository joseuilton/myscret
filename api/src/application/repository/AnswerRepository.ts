import AnswerEntity from "@domain/entities/AnswerEntity";

export default interface AnswerRepository {
  create: (answer: AnswerEntity) => Promise<AnswerEntity>;
}