import express from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";

import HttpServer from "./HttpServer";
import RouterFactory from "./RouterFactory";

export default class ExpressAdapter implements HttpServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors({
      credentials: true,
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    }));
    this.app.use(bodyParser.json());

    const router = new RouterFactory();

    this.app.use("/api", router.register());
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  }
}