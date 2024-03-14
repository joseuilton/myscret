import UUIDGenerator from "./UUIDGenerator"
import UserEntity from "./UserEntity";

export default class QuestionEntity {
  constructor(
    readonly questionId: string,
    readonly userId: string,
    readonly question: string,
    readonly createdAt: Date,
    readonly updatedAt: Date | null,
    readonly user?: UserEntity | null 
  ) {}

  static create(userId: string, question: string): QuestionEntity {
    const questionId = UUIDGenerator.generate();
    const createdAt = new Date();

    return new QuestionEntity(
      questionId,
      userId,
      question,
      createdAt,
      null
    )
  }
}