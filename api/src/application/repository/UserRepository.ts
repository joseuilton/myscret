import UserEntity from "@domain/entities/UserEntity";

export default interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByName(name: string): Promise<UserEntity | null>;
}