import AnswerRepository from "@application/repository/AnswerRepository";
import UserRepository from "@application/repository/UserRepository";
import Registry from "@infra/di/Registry";

export default class ListAnswersByUser {
  private readonly answerRepository: AnswerRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answerRepository = registry.resolve("AnswerRepository");
    this.userRepository = registry.resolve("UserRepository");
  }

  async execute(userId: string): Promise<OutputListAnswersByUser> {
    const answers = await this.answerRepository.listByUser(userId);
    const user = await this.userRepository.findById(userId);

    const outputAnswers = answers.map((answer) => ({
      answerId: answer.answerId,
      answer: answer.answer,
      question: answer.question!.question
    }));

    const outputUser = {
      userId: user!.userId,
      name: user!.name,
      username: user!.username,
      pictureUrl: user!.pictureUrl
    };

    return {
      answers: outputAnswers,
      user: outputUser
    }
  }
}

type OutputListAnswersByUser = {
  answers: {
    answerId: string;
    answer: string;
    question: string;
  }[];
  user: {
    userId: string;
    name: string;
    username: string;
    pictureUrl: string;
  }
}