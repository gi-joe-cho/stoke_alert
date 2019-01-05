const { Router } = require('express');
const usersRouter = require('./usersRouter');

const mainRouter = knex => {
  const router = new Router();
  return router
    .use('/users', usersRouter(knex));
};

module.exports = mainRouter;