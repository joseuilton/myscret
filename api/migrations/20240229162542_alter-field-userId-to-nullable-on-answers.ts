import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("answers", (table) => {
    table.uuid("userId").nullable().alter();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("answers", (table) => {
    table.uuid("userId").notNullable().alter();
  })
}

