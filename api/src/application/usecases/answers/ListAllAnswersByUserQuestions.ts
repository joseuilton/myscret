import HttpError from "@application/errors/HttpError";
import AnswerRepository from "@application/repository/AnswerRepository";
import Registry from "@infra/di/Registry";

export default class ListAllAnswersByUserQuestions {
  private readonly answersRepository: AnswerRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answersRepository = registry.resolve("AnswerRepository");
  }

  async execute(userId: string): Promise<OutputListAllAnswersByUserQuestions[]> {
    const answers = await this.answersRepository.listAllByUserQuestions(userId);
    const output = answers.map((answer) => ({
      answerId: answer.answerId,
      questionId: answer.questionId,
      pictureUrl: answer.pictureUrl,
      answer: answer.answer,
      createdAt: answer.createdAt
    } as OutputListAllAnswersByUserQuestions))

    return output;
  }
}

type OutputListAllAnswersByUserQuestions = {
  answerId: string;
  questionId: string;
  pictureUrl: string | null;
  answer: string;
  createdAt: Date;
}