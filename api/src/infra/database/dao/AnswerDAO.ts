import DAO from "@domain/dao/DAO";
import { AnswerModel } from "@domain/models";
import { DatabaseTablesNames, KnexTypeAdapter } from "../KnexAdapter";

export default class AnswerDAO implements DAO<AnswerModel> {
  private readonly tablename: string = DatabaseTablesNames.ANSWERS;
  
  constructor(private readonly connection: KnexTypeAdapter) {}

  async create(data: AnswerModel): Promise<AnswerModel> {
    const [savedAnswer] = await this.connection<AnswerModel>(this.tablename)
      .insert(data)
      .returning("*");

    return savedAnswer;
  }

  async findById(answerId: string): Promise<AnswerModel | null> {
    const searchedAnswer = await this.connection<AnswerModel>(this.tablename)
      .select("*")
      .where({ answerId })
      .first();

    return searchedAnswer || null;
  }
}