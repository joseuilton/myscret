import DAO from "@domain/dao/DAO";
import { QuestionModel } from "@domain/models";
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

  async findById(questionId: string): Promise<QuestionModel | null> {
    const searchedQuestion = await this.connection<QuestionModel>(this.tablename)
      .select("*")
      .where({ questionId })
      .first();

    return searchedQuestion || null;
  }
}