const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });
const Knex = require('knex');

const knex = new Knex({
  client: 'pg',
  connection: process.env.POSTGRESQL_TEST_URL,
});

module.exports = knex;