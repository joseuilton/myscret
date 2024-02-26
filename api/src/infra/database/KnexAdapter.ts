import { UserModel, AnswerModel, QuestionModel } from "@domain/models";

import knex, { Knex as KnexType } from "knex";
import DatabaseConnection from "./DatabaseConnection";

export default class KnexAdapter implements DatabaseConnection {
  private connection: KnexTypeAdapter;

  constructor() {
    this.connection = {} as KnexTypeAdapter;
  }

  async connect(): Promise<void> {
    try {
      this.connection = knex({
        client: process.env.DB_CLIENT,
        connection: {
          host: process.env.DB_HOSTNAME,
          database: process.env.DB_DATABASE,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        }
      })
    } catch (error) {
      throw new Error("Error connecting to database");
    }
  }

  async disconnect(): Promise<void> {
    this.connection.destroy();
  }

  get instance(): KnexTypeAdapter {
    return this.connection;
  }
}

interface DatabaseTables {
  users: UserModel,
  questions: QuestionModel,
  answers: AnswerModel
}

export enum DatabaseTablesNames {
  USERS = "users",
  QUESTIONS = "questions",
  ANSWERS = "answers"
}

export type KnexTypeAdapter = KnexType<DatabaseTables>;