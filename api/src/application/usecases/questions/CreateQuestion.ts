import QuestionRepository from "@application/repository/QuestionRepository";
import QuestionEntity from "@domain/entities/QuestionEntity";
import Registry from "@infra/di/Registry";

export default class CreateQuestion {
  private readonly questionRepository: QuestionRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.questionRepository = registry.resolve("QuestionRepository");
  }

  async execute(data: InputCreateQuestion): Promise<OutputCreateQuestion> {
    const question = QuestionEntity.create(data.userId, data.question);
    await this.questionRepository.create(question);
    return {
      questionId: question.questionId,
      userId: question.userId,
      question: question.question,
      createdAt: question.createdAt
    };
  }
}

type InputCreateQuestion = {
  userId: string;
  question: string;
}

type OutputCreateQuestion = {
  questionId: string;
  userId: string;
  question: string;
  createdAt: Date;
}