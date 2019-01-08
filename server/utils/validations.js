const jwt = require('jsonwebtoken');
const { findUserByNameOrEmail } = require('../queries/users');

const checkForDuplicateNameAndEmail = users => async ({ body: { username, email } }, res, next) => {
  const user = await findUserByNameOrEmail(users, username, email);
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

const validateSessionToken = async ({ body: { token }}, res, next) => {
  if (!token) {
    res.status(404).jsonp({ message: 'Session token is unavailable!' });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).jsonp({ message: "Token has expired!" });
    }
  });

  next();
};

module.exports = {
  checkForDuplicateNameAndEmail,
  validateSessionToken
};
