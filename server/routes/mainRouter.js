const { Router } = require('express');
const usersRouter = require('./usersRouter');

const mainRouter = () => {
  const router = new Router();
  return router
    .use('/users', usersRouter());
};

module.exports = mainRouter;