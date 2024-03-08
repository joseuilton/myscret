import bcrypt from "bcrypt";
import UUIDGenerator from "./UUIDGenerator";

export default class UserEntity {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly pictureUrl: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  static async create(
      name: string, email: string, password: string, pictureUrl: string
    ): Promise<UserEntity> {
    const userId = UUIDGenerator.generate();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();

    return new UserEntity(
      userId,
      name,
      pictureUrl,
      email,
      encryptedPassword,
      createdAt,
      null
    );
  }
}