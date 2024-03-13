import DAO from "@domain/dao/DAO";
import { AnswerModel, QuestionModel, UserModel } from "@domain/models";
import { DatabaseTablesNames, KnexTypeAdapter } from "../KnexAdapter";

export default class AnswerDAO implements DAO<AnswerModel> {
  private readonly tablename: string = DatabaseTablesNames.ANSWERS;

  constructor(private readonly connection: KnexTypeAdapter) { }

  async create(data: AnswerModel): Promise<AnswerModel> {
    const [savedAnswer] = await this.connection<AnswerModel>(this.tablename)
      .insert(data)
      .returning("*");

    return savedAnswer;
  }

  async get(answerId: string): Promise<{ answer: AnswerModel, question: QuestionModel, user: UserModel | null }> {
    const searchedAnswer = await this.connection(this.tablename)
      .select(
        "answers.*",
        "questions.questionId as questionsQuestionId",
        "questions.userId as questionsUserId",
        "questions.question as questionsQuestion",
        "questions.createdAt as questionsCreatedAt",
        "questions.updatedAt as questionsUpdatedAt",
        "users.userId as usersUserId",
        "users.name as usersName",
        "users.email as usersEmail",
        "users.username as usersUsername",
        "users.pictureUrl as usersPictureUrl",
        "users.createdAt as usersCreatedAt",
        "users.updatedAt as usersUpdatedAt"
      )
      .join("questions", "answers.questionId", "=", "questions.questionId")
      .leftJoin("users", "answers.userId", "=", "users.userId")
      .where("answers.answerId", "=", answerId)
      .first();

    return {
      answer: {
        answerId: searchedAnswer.answerId,
        questionId: searchedAnswer.questionId,
        userId: searchedAnswer.userId,
        answer: searchedAnswer.answer,
        viewedByQuestionOwner: searchedAnswer.viewedByQuestionOwner,
        createdAt: searchedAnswer.createdAt,
        updatedAt: searchedAnswer.updatedAt
      },
      question: {
        questionId: searchedAnswer.questionsQuestionId,
        userId: searchedAnswer.questionsUserId,
        question: searchedAnswer.questionsQuestion,
        createdAt: searchedAnswer.questionsCreatedAt,
        updatedAt: searchedAnswer.questionsUpdatedAt
      },
      user: searchedAnswer.usersUserId
        ? {
          userId: searchedAnswer.usersUserId,
          name: searchedAnswer.usersName,
          username: searchedAnswer.usersUsername,
          pictureUrl: searchedAnswer.usersPictureUrl,
          email: searchedAnswer.usersEmail,
          password: "",
          createdAt: searchedAnswer.usersCreatedAt,
          updatedAt: searchedAnswer.usersUpdatedAt
        }
        : null
    }
  }

  async updateViewed(answerId: string): Promise<AnswerModel | null> {
    const updatedAnswer = await this.connection<AnswerModel>(this.tablename)
      .where("answerId", answerId)
      .update({
          viewedByQuestionOwner: true,
          updatedAt: new Date() 
      })
      .returning("*");

    return updatedAnswer[0] ?? null;
  }

  async findById(answerId: string): Promise<AnswerModel | null> {
    const searchedAnswer = await this.connection<AnswerModel>(this.tablename)
      .select("*")
      .where({ answerId })
      .first();

    return searchedAnswer || null;
  }

  async listAllByUserQuestions(userId: string): Promise<{ answer: AnswerModel, user: UserModel | null }[]> {
    const searchedAnswers = await this.connection(this.tablename)
      .join("questions", "answers.questionId", "=", "questions.questionId")
      .leftJoin("users", "answers.userId", "=", "users.userId")
      .where("questions.userId", userId)
      .select("answers.*", "users.*")

    const output = searchedAnswers.map((line) => ({
      answer: {
        answerId: line.answerId,
        userId: line.userId,
        questionId: line.questionId,
        answer: line.answer,
        viewedByQuestionOwner: line.viewedByQuestionOwner,
        createdAt: line.createdAt,
        updatedAt: line.updatedAt,
      } as AnswerModel,
      user: line.userId
        ? {
          userId: line.userId,
          name: line.name,
          username: line.username,
          pictureUrl: line.pictureUrl,
          email: line.email,
          password: line.password,
          createdAt: line.createdAt,
          updatedAt: line.updatedAt
        } as UserModel
        : null
    }))

    return output;
  }

  async listByUser(userId: string): Promise<{ answer: AnswerModel, question: QuestionModel }[]> {
    const searchedAnswers = await this.connection(this.tablename)
      .select(
        "answers.*",
        "questions.questionId as questionQuestionId",
        "questions.userId as questionUserId",
        "questions.question",
        "questions.createdAt as questionCreatedAt",
        "questions.updatedAt as questionUpdatedAt"
      )
      .join("questions", "answers.questionId", "=", "questions.questionId")
      .where("answers.userId", "=", userId);

    const output = searchedAnswers.map((line) => ({
      answer: {
        answerId: line.answerId,
        questionId: line.questionId,
        userId: line.userId,
        answer: line.answer,
        viewedByQuestionOwner: line.viewedByQuestionOwner,
        createdAt: line.createdAt,
        updatedAt: line.updatedAt
      } as AnswerModel,
      question: {
        questionId: line.questionQuestionId,
        userId: line.questionUserId,
        question: line.question,
        createdAt: line.questionCreatedAt,
        updatedAt: line.updatedAt
      } as QuestionModel
    }));

    return output;
  }
}