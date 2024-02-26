import DAO from "@domain/dao/DAO";
import { DatabaseTablesNames, KnexTypeAdapter } from "../KnexAdapter";
import { UserModel } from "@domain/models";

export default class UserDAO implements DAO<UserModel> {
  private readonly tablename: string = DatabaseTablesNames.USERS;

  constructor(private connection: KnexTypeAdapter) {}

  async create(data: UserModel): Promise<UserModel> {
    const [savedUser] = await this.connection<UserModel>(this.tablename)
      .insert(data)
      .returning("*");

    return savedUser;
  }

  async findById(userId: string): Promise<UserModel | null> {
    const searchedUser = await this.connection<UserModel>(this.tablename)
      .select("*")
      .where("userId", userId)
      .first()

    return searchedUser || null;
  }
}