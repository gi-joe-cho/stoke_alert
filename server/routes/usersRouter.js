const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { findUserById, addNewUser, findUserByName } = require('../queries/users');
const { checkForDuplicateNameAndEmail } = require('../utils/validations');
const { returnUserObject } = require('../utils/dataHelper');

const usersRouter = knex => {
  const users = knex('users');
  const router = new Router();

  return router
    .get('/:id', async ({ params: { id } }, res, next) => {
      try {
        const user = await findUserById(users, id);
        if (user) {
          return res.status(200).jsonp({ user });
        }
        return res.status(404).jsonp({ message: 'User record not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
    .post('/signup', checkForDuplicateNameAndEmail(users), async ({ body }, res, next) => {
      const newUser = returnUserObject(body);
      try {
        await addNewUser(users, newUser);
        return res.status(200).jsonp({ message: `${newUser.username} has been successfully added as a new user!` });
      }
      catch (error) {
        return res.status(500).jsonp(error);
      }
    })
    .post('/signin', async ({ body: { username, password } }, res, next) => {
      try {
        const user = await findUserByName(users, username);
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const jwtSign = promisify(jwt.sign);
            const token = await jwtSign({ password: user.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
            return res.status(200).jsonp({ ...user, token });
          }
          return res.status(404).jsonp({ message: 'Password did not match with the given username!' });
        }
        return res.status(404).jsonp({ message: 'User record is not found!' });
      }
      catch (error) {
        return res.status(500).jsonp({ error });
      }
    });
};

module.exports = usersRouter;