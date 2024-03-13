import AnswerRepository from "@application/repository/AnswerRepository";
import UserRepository from "@application/repository/UserRepository";
import AnswerEntity from "@domain/entities/AnswerEntity";
import Registry from "@infra/di/Registry";

export default class CreateAnswer {
  private readonly answerRepository: AnswerRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answerRepository = registry.resolve("AnswerRepository");
    this.userRepository = registry.resolve("UserRepository");
  }

  async execute(data: InputCreateAnswer): Promise<OutputCreateAnswer> {
    const user = data.username
      ? await this.userRepository.findByUsername(data.username)
      : null

    const answerEntity = AnswerEntity.create(
      data.questionId, user ? user.userId : null, data.answer
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
  username: string | undefined;
  answer: string;
}

type OutputCreateAnswer = {
  answerId: string;
  questionId: string;
  userId: string | null;
  answer: string;
  createdAt: Date;
}