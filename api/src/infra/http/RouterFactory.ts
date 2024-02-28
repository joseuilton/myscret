import UserController from "@application/controller/UserController";
import UserControllerImpl from "./controller/UserControllerImpl";
import { Router } from "express";


export default class RouterFactory {
  private userController: UserController;

  constructor() {
    this.userController = new UserControllerImpl();
  }

  register(): Router {
    const router = Router();

    router.post("/users", this.userController.create);

    return router;
  }
}