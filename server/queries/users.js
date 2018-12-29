const knex = require('./knex');
const users = knex('users');

const findUserById = id =>
  users
    .where(id)
    .first()
    .then(user => user)
    .catch(error => error);

const addNewUser = newUser =>
  users
    .insert(newUser)
    .catch(error => error);

module.exports = {
  findUserById,
  addNewUser,
};