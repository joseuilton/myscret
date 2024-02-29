import AnswerRepository from "@application/repository/AnswerRepository";
import AnswerEntity from "@domain/entities/AnswerEntity";
import Registry from "@infra/di/Registry";

export default class CreateAnswer {
  private readonly answerRepository: AnswerRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answerRepository = registry.resolve("AnswerRepository");
  }

  async execute(data: InputCreateAnswer): Promise<OutputCreateAnswer> {
    const answerEntity = AnswerEntity.create(
      data.questionId, data.userId ?? null, data.answer
    );

    await this.answerRepository.create(answerEntity);
    
    return {
      answerId: answerEntity.answerId,
      questionId: answerEntity.questionId,
      userId: answerEntity.userId,
      answer: answerEntity.answer,
      createdAt: answerEntity.createdAt
    };
  }
}

type InputCreateAnswer = {
  questionId: string;
  userId: string | undefined;
  answer: string;
}

type OutputCreateAnswer = {
  answerId: string;
  questionId: string;
  userId: string | null;
  answer: string;
  createdAt: Date;
}