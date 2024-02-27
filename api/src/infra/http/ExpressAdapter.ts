import express from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";

import HttpServer from "./HttpServer";
import UserControllerImpl from "./controller/UserControllerImpl";

export default class ExpressAdapter implements HttpServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    const userController = new UserControllerImpl();

    this.app.post("/api/users", userController.create);
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  }
}