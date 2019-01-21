const { Router } = require('express');
const usersRouter = require('./usersRouter');
const postsRouter = require('./postsRouter');

const mainRouter = knex => {
  const router = new Router();
  return router
    .use('/users', usersRouter(knex))
    .use('/posts', postsRouter(knex));
};

module.exports = mainRouter;