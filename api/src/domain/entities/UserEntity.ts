import bcrypt from "bcrypt";
import UUIDGenerator from "./UUIDGenerator";
import HashGenerator from "./HashGenerator";

export default class UserEntity {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly username: string,
    readonly pictureUrl: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  static async create(
      name: string, username: string, email: string, password: string, pictureUrl: string
    ): Promise<UserEntity> {
    const userId = UUIDGenerator.generate();
    const hashPassword = await HashGenerator.hash(password);
    const createdAt = new Date();

    return new UserEntity(
      userId,
      name,
      username,
      pictureUrl,
      email,
      hashPassword,
      createdAt,
      null
    );
  }
}