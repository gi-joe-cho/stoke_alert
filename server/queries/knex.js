const Knex = require('knex');

const knex = new Knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: 'utf8'
  },
});

module.exports = knex;