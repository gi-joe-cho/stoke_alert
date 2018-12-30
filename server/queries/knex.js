const Knex = require('knex');

const knex = new Knex({
  client: 'pg',
  connection: process.env.POSTGRESQL_DEV_URL,
});

module.exports = knex;