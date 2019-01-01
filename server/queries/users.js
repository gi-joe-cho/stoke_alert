const findUserById = (users, id) =>
  users
    .where(id)
    .first();

const findUserByNameOrEmail = (users, username, email) =>
  users
    .where('username', username)
    .orWhere('email', email)
    .first();

const addNewUser = (users, newUser) =>
  users
    .insert(newUser)
    .catch(error => error);

module.exports = {
  findUserById,
  findUserByNameOrEmail,
  addNewUser,
};