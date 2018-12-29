const { Router } = require('express');
const { findUserById, findUserByName, addNewUser } = require('../queries/users');

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
    .post('/', (req, res, next) => {

    });
};

module.exports = usersRouter;