const knex = require('./knex');
const users = knex('users');

const findUserById = id =>
  users
    .where(id)
    .first()
    .then(user => user)
    .catch(error => error);

const findUserByEmail = email =>
  users
    .where('email', email)
    .first()
    .then(user => user)
    .catch(error => error);

const findUserByName = username =>
  users
    .where('username', username)
    .first()
    .then(user => user)
    .catch(error => error);

const addNewUser = newUser =>
  users
    .insert(newUser)
    .catch(error => error);

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByName,
  addNewUser,
};