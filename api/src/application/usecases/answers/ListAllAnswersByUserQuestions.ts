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
      user: answer.user
        ? {
          pictureUrl: answer.user?.pictureUrl
        }
        : null,
      viewedByQuestionOwner: answer.viewedByQuestionOwner,
      createdAt: answer.createdAt
    } as OutputListAllAnswersByUserQuestions))

    return output;
  }
}

type OutputListAllAnswersByUserQuestions = {
  answerId: string;
  user: { pictureUrl: string } | null;
  viewedByQuestionOwner: boolean;
  createdAt: Date;
}