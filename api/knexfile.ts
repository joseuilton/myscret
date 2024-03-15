import "dotenv/config"
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOSTNAME,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./migrations"
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOSTNAME,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./migrations"
    }
  }
}

export default config;