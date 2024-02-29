import UserController from "@application/controller/UserController";
import UserControllerImpl from "./controller/UserControllerImpl";
import { Router } from "express";
import QuestionController from "@application/controller/QuestionController";
import QuestionControllerImpl from "./controller/QuestionControllerImpl";


export default class RouterFactory {
  private userController: UserController;
  private questionController: QuestionController

  constructor() {
    this.userController = new UserControllerImpl();
    this.questionController = new QuestionControllerImpl();
  }

  register(): Router {
    const router = Router();

    router.post("/users", this.userController.create);
    router.get("/users/:userId/questions", this.questionController.listByUser);

    router.post("/questions", this.questionController.create);
    router.delete("/questions/:questionId", this.questionController.delete);

    return router;
  }
}