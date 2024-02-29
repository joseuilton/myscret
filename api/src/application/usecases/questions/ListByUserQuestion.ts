import QuestionRepository from "@application/repository/QuestionRepository";
import QuestionEntity from "@domain/entities/QuestionEntity";
import Registry from "@infra/di/Registry";

export default class ListByUserQuestion {
  private readonly questionRepository: QuestionRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.questionRepository = registry.resolve("QuestionRepository");
  }

  async execute(userId: string): Promise<OutputListByUser[]> {
    const questions = await this.questionRepository.listByUser(userId);
    const output = questions.map((question: QuestionEntity) => ({
      questionId: question.questionId,
      userId: question.userId,
      question: question.question,
      createdAt: question.createdAt
    } as OutputListByUser))

    return output;
  }
}

type OutputListByUser = {
  questionId: string;
  userId: string;
  question: string;
  createdAt: Date;
}