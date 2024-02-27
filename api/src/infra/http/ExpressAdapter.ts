import express from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";

import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.app.get("/api", (req, res) => {
      return res.json({ message: "Hello, World!" });
    })
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  }
}