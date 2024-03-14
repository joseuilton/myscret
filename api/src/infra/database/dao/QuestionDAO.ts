import DAO from "@domain/dao/DAO";
import { QuestionModel, UserModel } from "@domain/models";
import { DatabaseTablesNames, KnexTypeAdapter } from "../KnexAdapter";

export default class QuestionDAO implements DAO<QuestionModel> {
  private readonly tablename: string = DatabaseTablesNames.QUESTIONS;

  constructor(private connection: KnexTypeAdapter) {}

  async create(data: QuestionModel): Promise<QuestionModel> {
    const [savedQuestion] = await this.connection<QuestionModel>(this.tablename)
      .insert(data)
      .returning("*");

    return savedQuestion;
  }

  async findById(questionId: string): Promise<{ question: QuestionModel, user: UserModel } | null> {
    const searchedQuestion = await this.connection(this.tablename)
      .select(
        "questions.*",
        "users.userId as usersUserId",
        "users.name as usersName",
        "users.username as usersUsername",
        "users.email as usersEmail",
        "users.pictureUrl as usersPictureUrl",
        "users.createdAt as usersCreatedAt",
        "users.updatedAt as usersUpdatedAt"
      )
      .join("users", "questions.userId", "=", "users.userId")
      .where("questions.questionId", "=", questionId)
      .first();

    if (!searchedQuestion) return null;

    const output = {
      question: {
        questionId: searchedQuestion.questionId,
        userId: searchedQuestion.userId,
        question: searchedQuestion.question,
        createdAt: searchedQuestion.createdAt,
        updatedAt: searchedQuestion.updatedAt,
      },
      user: {
        userId: searchedQuestion.usersUserId,
        name: searchedQuestion.usersName,
        username: searchedQuestion.usersUsername,
        pictureUrl: searchedQuestion.usersPictureUrl,
        email: searchedQuestion.usersEmail,
        password: "",
        createdAt: searchedQuestion.usersCreatedAt,
        updatedAt: searchedQuestion.usersUpdatedAt,
      }
    }

    return output;
  }

  async findByUser(userId: string): Promise<QuestionModel[]> {
    const data = await this.connection<QuestionModel>(this.tablename)
    .where({ userId })
    .select("*")

    return data;
  }

  async delete(questionId: string): Promise<void> {
    await this.connection<QuestionModel>(this.tablename)
      .where({ questionId })
      .delete();
  }
}