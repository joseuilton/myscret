import HttpError from "@application/errors/HttpError";
import AnswerRepository from "@application/repository/AnswerRepository";
import Registry from "@infra/di/Registry";

export default class GetAnswer {
  private readonly answerRepository: AnswerRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.answerRepository = registry.resolve("AnswerRepository");
  }

  async execute(input: InputGetAnswer): Promise<OutputGetAnswer> {
    const answer = await this.answerRepository.get(input.answerId);

    if (answer.question!.userId !== input.userId) {
      throw new HttpError("You are not owner of this question", 401);
    }

    if (!answer.viewedByQuestionOwner) {
      await this.answerRepository.updateViewed(input.answerId);
    }

    return {
      answer: {
        answerId: answer.answerId,
        answer: answer.answer,
        viewedByQuestionOwner: true,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
      question: {
        questionId: answer.question!.questionId,
        question: answer.question!.question,
        createdAt: answer.question!.createdAt,
        updatedAt: answer.question!.updatedAt,
      },
      user: answer.user
        ? {
            userId: answer.user.userId,
            name: answer.user.name,
            username: answer.user.username,
            pictureUrl: answer.user.pictureUrl,
            createdAt: answer.user.createdAt,
            updatedAt: answer.user.updatedAt
        }
        : null
    } as OutputGetAnswer;
  }
}

type InputGetAnswer = {
  answerId: string;
  userId: string;
}

type OutputGetAnswer = {
  answer: {
    answerId: string;
    answer: string;
    viewedByQuestionOwner: boolean;
    createdAt: Date,
    updatedAt: Date
  }
  question: {
    questionId: string;
    question: string;
    createdAt: Date;
    updatedAt: Date;
  }
  user: {
    userId: string;
    name: string;
    username: string;
    pictureUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
}