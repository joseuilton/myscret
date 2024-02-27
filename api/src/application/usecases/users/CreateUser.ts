import UserRepository from "@application/repository/UserRepository";
import UserEntity from "@domain/entities/UserEntity";
import Registry from "@infra/di/Registry";

export default class CreateUser {
  private readonly userRepository: UserRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.userRepository = registry.resolve("UserRepository");
  }

  async execute(input: InputCreateUser): Promise<OutputCreateUser> {
    const searchedUser = await this.userRepository.findByEmail(input.email);
    if (searchedUser) throw new Error("User with this email already exists.");

    const userEntity = UserEntity.create(input.email, input.password);
    await this.userRepository.create(userEntity);

    return {
      userId: userEntity.userId,
      email: userEntity.email,
      createdAt: userEntity.createdAt
    }
  }
}

type InputCreateUser = {
  email: string;
  password: string;
}

type OutputCreateUser = {
  userId: string;
  email: string;
  createdAt: Date;
}