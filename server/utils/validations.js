const { findUserByNameOrEmail } = require('../queries/users');

const checkForDuplicateNameAndEmail = async ({ body: { username, email } }, res, next) => {
  const user = await findUserByNameOrEmail(username, email);
  if (user) {
    if (user.username === username) {
      return res.status(400).json({ error: `User with username ${username} already exists!` });
    }
    if (user.email === email) {
      return res.status(400).json({ error: `User with email ${email} already exists!` });
    }
  }
  next();
};

module.exports = checkForDuplicateNameAndEmail;
