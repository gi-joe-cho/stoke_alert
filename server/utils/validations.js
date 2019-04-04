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

const checkSessionTokenExists = async ({ body: { username }, headers: { token } }, res, next) => {
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
    if (decoded) {
      return res.status(401).jsonp({ message: `${username} is already logged in!` });
    }
    return next();
  });
};

const validateSessionTokenExpiration = async ({ headers: { token }}, res, next) => {
  if (!token) {
    return res.status(401).jsonp({ message: 'Session token is unavailable!' });
  }
  const expired = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return true;
    }
  });
  if (!expired) {
    return res.status(401).jsonp({ message: "Token has not expired yet!" });
  }

  next();
};

const verifySessionTokenForAccess = async ({ headers: { token } }, res, next) => {
  if (!token) {
    return res.status(401).jsonp({ message: 'Session token is unavailable!' });
  }
  const expired = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return true;
    }
  });
  if (expired) {
    return res.status(401).jsonp({ message: "Token has expired! Try signing in again!" });
  }

  next();
};

module.exports = {
  checkForDuplicateNameAndEmail,
  checkSessionTokenExists,
  validateSessionTokenExpiration,
  verifySessionTokenForAccess,
};
