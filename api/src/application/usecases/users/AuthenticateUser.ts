import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "@application/errors/HttpError";
import UserRepository from "@application/repository/UserRepository";
import Registry from "@infra/di/Registry";

export default class AuthenticateUser {
  private readonly userRepository: UserRepository;

  constructor() {
    const registry = Registry.getInstance();
    this.userRepository = registry.resolve("UserRepository");
  }

  async execute(data: InputAuthenticateUser): Promise<string> {
    if (!data.email) throw new HttpError("Email field is required.", 400);
    if (!data.password) throw new HttpError("Password field is required.", 400);

    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new HttpError("User with this email does not exists.", 404);

    const isEqualPassword = await bcrypt.compare(data.password, user.password);

    if (!isEqualPassword) throw new HttpError("Incorrect password.", 404);

    try {
      const token = jwt.sign(
        {
          userId: user.userId,
          name: user.name,
          username: user.username,
          email: user.email,
          pictureUrl: user.pictureUrl,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      return token;
    } catch (err) {
      throw new HttpError("Something wents wrong, please try again later.", 500);
    }
  }
}

type InputAuthenticateUser = {
  email: string;
  password: string;
}
