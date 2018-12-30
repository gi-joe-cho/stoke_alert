const {
  findUserByEmail,
  findUserByName,
} = require('../queries/users');

const checkForDuplicateEmail = async ({ body: { email } }, res, next) => {
  console.log(email);
  const user = await findUserByEmail(email);
  console.log("EMAIL: ", user);
  if (user) {
    return res.status(400).json({ error: ` User with email ${email} already exists!` });
  }
  next();
};

const checkForDuplicateName = async ({ body: { username } }, res, next) => {
  console.log(username);
  const user = await findUserByName(username);
  console.log("NAME: ", user);
  if (user) {
    return res.status(400).json({ error: `User with username ${username} already exists!` });
  }
  next();
};

module.exports = {
  checkForDuplicateEmail,
  checkForDuplicateName,
};
