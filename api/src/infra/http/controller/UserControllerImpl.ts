import { Request, Response } from "express";
import UserController from "@application/controller/UserController";
import CreateUser from "@application/usecases/users/CreateUser";

export default class UserControllerImpl implements UserController {
  async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const userData = { email, password };
    const createdUser = await new CreateUser().execute(userData);

    response.status(201).json({ user: createdUser });
  }
}