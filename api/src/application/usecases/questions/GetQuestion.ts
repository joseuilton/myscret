import HttpError from "@application/errors/HttpError";
import QuestionRepository from "@application/repository/QuestionRepository";
import Registry from "@infra/di/Registry";

export default class GetQuestion {
  private readonly questionRepository: QuestionRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.questionRepository = registry.resolve("QuestionRepository");
  }

  async execute(questionId: string): Promise<OutputGetQuestion> {
    const question = await this.questionRepository.get(questionId);

    if (!question) {
      throw new HttpError("Question not found.", 404);
    }

    const output = {
      question: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      user: {
        pictureUrl: question.user!.pictureUrl
      }
    } as OutputGetQuestion;

    return output;
  }
}

type OutputGetQuestion = {
  question: string;
  createdAt: Date;
  updatedAt: Date | null;
  user: {
    pictureUrl: string;
  }
};