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
    await this.validate(input);

    const userEntity = await UserEntity.create(
      input.name, input.email, input.password, input.pictureUrl
    );
    await this.userRepository.create(userEntity);

    return {
      userId: userEntity.userId,
      name: userEntity.name,
      email: userEntity.email,
      pictureUrl: userEntity.pictureUrl,
      createdAt: userEntity.createdAt
    }
  }

  async validate({ name, email, password, pictureUrl }: InputCreateUser): Promise<void> {
    if (!name) throw new Error("name field is required.");
    if (!email) throw new Error("email field is required.");
    if (!password) throw new Error("password field is required");
    if (!pictureUrl) throw new Error("picture url field is required");

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(email)) throw new Error("Invalid email.");

    const searchedByEmail = await this.userRepository.findByEmail(email);
    if (searchedByEmail) throw new Error("User with this email already exists.");

    const searchedByName = await this.userRepository.findByName(name);
    if (searchedByName) throw new Error("User with this username already exists.");
  }
}

type InputCreateUser = {
  name: string;
  email: string;
  password: string;
  pictureUrl: string;
}

type OutputCreateUser = {
  userId: string;
  name: string;
  email: string;
  pictureUrl: string;
  createdAt: Date;
}