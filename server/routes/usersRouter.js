const { Router } = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const { findUserById, addNewUser } = require('../queries/users');
const checkForDuplicateNameAndEmail = require('../utils/validations');

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
    .post('/', checkForDuplicateNameAndEmail, async ({ body }, res, next) => {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
      const newUser = {
        id: uuid(),
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        email: body.email,
        password: hashedPassword,
        birth_date: body.birth_date,
        city: body.city,
        state: body.state,
        annotation: body.annotation,
      };

      try {
        await addNewUser(newUser);
        return res.status(200).jsonp({ message: `${newUser.username} has been successfully added as a new user!` });
      }
      catch (error) {
        console.error(error);
        return res.status(400).jsonp({ error: "Could not add new user!" });
      }
    });
};

module.exports = usersRouter;