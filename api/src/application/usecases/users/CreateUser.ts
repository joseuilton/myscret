import HttpError from "@application/errors/HttpError";
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
    if (!name) throw new HttpError("name field is required.", 400);
    if (!email) throw new HttpError("email field is required.", 400);
    if (!password) throw new HttpError("password field is required", 400);
    if (!pictureUrl) throw new HttpError("picture url field is required", 400);

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(email)) throw new HttpError("Invalid email.", 400);

    const searchedByEmail = await this.userRepository.findByEmail(email);
    if (searchedByEmail) throw new HttpError("User with this email already exists.", 400);

    const searchedByName = await this.userRepository.findByName(name);
    if (searchedByName) throw new HttpError("User with this username already exists.", 400);
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