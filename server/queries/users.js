const knex = require('./knex');
const users = knex('users');

const findUserById = id =>
  users
    .where(id)
    .first();

const findUserByEmail = email =>
  users
    .where('email', email)
    .first();

const findUserByName = username =>
  users
    .where('username', username)
    .first();

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