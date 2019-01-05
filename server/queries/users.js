const findUserById = (users, id) =>
  users
    .clone()
    .where('id', id)
    .first()
    .catch(error => error);

const findUserByNameOrEmail = (users, username, email) =>
  users
    .clone()
    .where('username', username)
    .orWhere('email', email)
    .first()
    .catch(error => error);

const addNewUser = (users, newUser) =>
  users
    .clone()
    .insert(newUser)
    .returning('*');

module.exports = {
  findUserById,
  findUserByNameOrEmail,
  addNewUser,
};