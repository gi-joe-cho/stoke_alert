const Knex = require('knex');
const returnPostgresConnection = () => process.env.NODE_ENV
  ? process.env.POSTGRESQL_DEV_URL
  : process.env.POSTGRESQL_TEST_URL;

const knex = new Knex({
  client: 'pg',
  connection: returnPostgresConnection(),
});

module.exports = knex;