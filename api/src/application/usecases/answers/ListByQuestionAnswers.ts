import AnswerRepository from "@application/repository/AnswerRepository";
import Registry from "@infra/di/Registry";

export default class ListByQuestionAnswers {
  private readonly answerRepository: AnswerRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answerRepository = registry.resolve("AnswerRepository");
  }

  async execute(questionId: string): Promise<OutputListByQuestionAnswer[]> {
    const answers = await this.answerRepository.listByQuestion(questionId);
    const output = answers.map((answer) => ({
      answerId: answer.answerId,
      userId: answer.userId,
      answer: answer.answer,
      createdAt: answer.createdAt
    } as OutputListByQuestionAnswer));

    return output;
  }
}

type OutputListByQuestionAnswer = {
  answerId: string;
  userId: string | null;
  answer: string;
  createdAt: Date;
}