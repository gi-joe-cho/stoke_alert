const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const returnUserObject = user => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
  return {
    id: uuid(),
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    password: hashedPassword,
    birth_date: user.birth_date,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    annotation: user.annotation,
  }
};

module.exports = {
  returnUserObject,
};
