import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("answers", (table) => {
    table.boolean("viewedByQuestionOwner").defaultTo(false);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("answers", (table) => {
    table.dropColumn("viewedByQuestionOwner");
  })
}

