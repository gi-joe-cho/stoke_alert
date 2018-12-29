import Knex from 'knex';

export const knex = new Knex({
  client: 'pg',
  connection: process.env.POSTGRESQL_URL,
});