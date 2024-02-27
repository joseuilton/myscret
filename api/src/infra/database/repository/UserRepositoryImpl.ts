import UserRepository from "@application/repository/UserRepository";
import UserDAO from "../dao/UserDAO";
import UserEntity from "@domain/entities/UserEntity";
import { UserModel } from "@domain/models";

export default class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDAO: UserDAO) {}

  toEntity(user: UserModel): UserEntity {
    return new UserEntity(
      user.userId,
      user.name,
      user.pictureUrl,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }

  toModel(user: UserEntity): UserModel {
    return {
      userId: user.userId,
      name: user.name,
      pictureUrl: user.pictureUrl,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as UserModel;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await this.userDAO.create(this.toModel(user));
    return user;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    await this.userDAO.update(this.toModel(user));
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userDAO.findById(id);
    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userDAO.findByEmail(email);
    return user ? this.toEntity(user) : null;
  }
}