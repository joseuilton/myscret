import UUIDGenerator from "./UUIDGenerator";

export default class AnswerEntity {
  readonly pictureUrl: string | null;

  constructor(
    readonly answerId: string,
    readonly questionId: string,
    readonly userId: string | null,
    readonly answer: string,
    readonly createdAt: Date,
    readonly updatedAt: Date | null,
    pictureUrl: string | null = null
  ) {
    this.pictureUrl = pictureUrl;
  }

  static create(
    questionId: string, 
    userId: string | null, 
    answer: string
  ): AnswerEntity {
    const answerId = UUIDGenerator.generate();
    const createdAt = new Date();

    return new AnswerEntity(answerId, questionId, userId, answer, createdAt, null);
  }
}