const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const UserModel = require('../models/userModel');
const { findUserById, addNewUser, findUserByName } = require('../queries/users');
const { checkForDuplicateNameAndEmail, checkSessionTokenExists, validateSessionTokenExpiration } = require('../utils/validations');
const { returnUserObject } = require('../utils/dataHelper');

const usersRouter = knex => {
  const users = knex('users');
  const router = new Router();

  return router
    .get('/:id', async ({ params: { id } }, res) => {
      try {
        const response = await findUserById(users, id);
        if (response) {
          const user = new UserModel(response);
          return res.status(200).jsonp({ user: user.getUser() });
        }
        return res.status(404).jsonp({ message: 'User record not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
    .post('/signup', checkForDuplicateNameAndEmail(users), async ({ body }, res) => {
      const newUser = returnUserObject(body);
      try {
        await addNewUser(users, newUser);
        return res.status(200).jsonp({ message: `${newUser.username} has been successfully added as a new user!` });
      }
      catch (error) {
        return res.status(500).jsonp(error);
      }
    })
    .post('/signin', checkSessionTokenExists, async ({ body: { username, password } }, res) => {
      try {
        const response = await findUserByName(users, username);
        if (response) {
          const user = new UserModel(response);
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const jwtSign = promisify(jwt.sign);
            const token = await jwtSign({ password: user.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
            return res.status(200).jsonp({ ...user.getUser(), token });
          }
          return res.status(404).jsonp({ message: 'Password did not match with the given username!' });
        }
        return res.status(404).jsonp({ message: 'User record is not found!' });
      }
      catch (error) {
        return res.status(500).jsonp({ error });
      }
    })
    .post('/refresh_token', validateSessionTokenExpiration, async ({ body: { username } }, res) => {
      const response = await findUserByName(users, username);
      const user = new UserModel(response);
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: user.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
      return res.status(200).jsonp({ ...user.getUser(), token });
    });
};

module.exports = usersRouter;