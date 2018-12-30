const knex = require('./knex');
const users = knex('users');

const findUserById = id =>
  users
    .where(id)
    .first();

const findUserByNameOrEmail = (username, email) =>
  users
    .where('username', username)
    .orWhere('email', email)
    .first();

const addNewUser = newUser =>
  users
    .insert(newUser)
    .catch(error => error);

module.exports = {
  findUserById,
  findUserByNameOrEmail,
  addNewUser,
};