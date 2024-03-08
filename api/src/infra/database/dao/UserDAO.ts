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

  async update(data: UserModel): Promise<UserModel> {
    const [updatedUser] = await this.connection<UserModel>(this.tablename)
      .where({ userId: data.userId })
      .update(data)
      .returning("*");

    return updatedUser;
  }

  async findById(userId: string): Promise<UserModel | null> {
    const searchedUser = await this.connection<UserModel>(this.tablename)
      .select("*")
      .where("userId", userId)
      .first()

    return searchedUser || null;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const searchedUser = await this.connection<UserModel>(this.tablename)
      .select("*")
      .where({ email })
      .first();

    return searchedUser || null;
  }

  async findByName(name: string): Promise<UserModel | null> {
    const searchedUser = await this.connection<UserModel>(this.tablename)
      .select("*")
      .where({ name })
      .first();

    return searchedUser || null;
  }
}