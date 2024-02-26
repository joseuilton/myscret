import UUIDGenerator from "./UUIDGenerator";

export default class UserEntity {
  constructor(
    readonly userId: string,
    readonly name: string | null,
    readonly pictureUrl: string | null,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  static create(email: string, password: string): UserEntity {
    const userId = UUIDGenerator.generate();
    const createdAt = new Date();

    return new UserEntity(
      userId,
      null,
      null,
      email,
      password,
      createdAt,
      null
    );
  }
}