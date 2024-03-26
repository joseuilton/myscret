import { Router } from "express";

import UserController from "@application/controller/UserController";
import UserControllerImpl from "./controller/UserControllerImpl";
import QuestionController from "@application/controller/QuestionController";
import QuestionControllerImpl from "./controller/QuestionControllerImpl";
import AnswerController from "@application/controller/AnswerController";
import AnswerControllerImpl from "./controller/AnswerControllerImpl";
import tokenValidation from "./middlewares/TokenValidation";
import TokenValidation from "./middlewares/TokenValidation";
import ErrorsMiddleware from "./middlewares/ErrorsMiddleware";


export default class RouterFactory {
  private readonly userController: UserController;
  private readonly questionController: QuestionController;
  private readonly answerController: AnswerController;

  constructor() {
    this.userController = new UserControllerImpl();
    this.questionController = new QuestionControllerImpl();
    this.answerController = new AnswerControllerImpl();
  }

  register(): Router {
    const router = Router();

    router.post("/users", this.userController.create);
    router.get("/users", TokenValidation.handle, this.userController.get);

    router.post("/users/authenticate", this.userController.authenticate);
    router.get("/users/:userId/questions", this.questionController.listByUser);
    router.get("/users/answers", TokenValidation.handle, this.answerController.listByUser);

    router.post("/questions", TokenValidation.handle, this.questionController.create);
    router.get(
      "/questions/answers", TokenValidation.handle, this.answerController.listByUserQuestions
    );
    router.get("/questions/:questionId", this.questionController.get)
    router.delete("/questions/:questionId", TokenValidation.handle, this.questionController.delete);

    router.post("/questions/:questionId/answers", this.answerController.create);

    router.get("/answers/:answerId", TokenValidation.handle, this.answerController.getAnswer);

    router.use(ErrorsMiddleware.handle);

    return router;
  }
}