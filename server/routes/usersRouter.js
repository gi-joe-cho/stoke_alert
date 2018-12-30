const { Router } = require('express');
const { findUserById, addNewUser } = require('../queries/users');
const { checkForDuplicateEmail, checkForDuplicateName } = require('../utils/validations');

const usersRouter = () => {
  const router = new Router();

  return router
    .get('/:id', async ({ params: id }, res, next) => {
      try {
        const user = await findUserById(id);
        res.status(200).json({ user });
      }
      catch(error) {
        res.status(404).json({ error });
      }
    })
    .post('/', checkForDuplicateName, checkForDuplicateEmail, ({ body }, res, next) => {
      res.status(200).jsonp("YAS!");
    });
};

module.exports = usersRouter;