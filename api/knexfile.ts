import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "mysecretdb",
      user: "postgres",
      password: "postgres"
    },
    migrations: {
      directory: "./migrations"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "mysecretdb",
      userName: "postgres",
      password: "postgres"
    },
    migrations: {
      directory: "./migrations"
    }
  }
}

export default config;