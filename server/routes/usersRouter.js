const { Router } = require('express');

const usersRouter = () => {
  const router = new Router();

  return router
    .get('/', (req, res, next) => {

    })
    .post('/', (req, res, next) => {

    });
};

module.exports = usersRouter;