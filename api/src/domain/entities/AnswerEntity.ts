import QuestionEntity from "./QuestionEntity";
import UUIDGenerator from "./UUIDGenerator";
import UserEntity from "./UserEntity";

export default class AnswerEntity {
  constructor(
    readonly answerId: string,
    readonly questionId: string,
    readonly userId: string | null,
    readonly answer: string,
    readonly viewedByQuestionOwner: boolean = false,
    readonly createdAt: Date,
    readonly updatedAt: Date | null,
    readonly user: UserEntity | null,
    readonly question: QuestionEntity | null
  ) {}

  static create(
    questionId: string, 
    userId: string | null, 
    answer: string
  ): AnswerEntity {
    const answerId = UUIDGenerator.generate();
    const createdAt = new Date();

    return new AnswerEntity(answerId, questionId, userId, answer, false, createdAt, null, null, null);
  }
}