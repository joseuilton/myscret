import { Request, Response } from "express";
import UserController from "@application/controller/UserController";
import CreateUser from "@application/usecases/users/CreateUser";
import AuthenticateUser from "@application/usecases/users/AuthenticateUser";

export default class UserControllerImpl implements UserController {
  async create(request: Request, response: Response): Promise<void> {
    const { name, username, pictureUrl, email, password } = request.body;
    const userData = { name, username, pictureUrl, email, password };
    const createdUser = await new CreateUser().execute(userData);

    response.status(201).json({ user: createdUser });
  }

  async authenticate(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const loginData = { email, password };
    const output = await new AuthenticateUser().execute(loginData);

    response.status(200).json(output);
  }

  async get(request: Request, response: Response): Promise<void> {
    const user = JSON.parse(String(request.headers["user"]));
    response.status(200).json({ user });
  }
}