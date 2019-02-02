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

const formatDate = date => {
  const formattedDate = new Date(date);
  let month = '' + (formattedDate.getMonth() + 1);
  let day = '' + formattedDate.getDate();
  let year = formattedDate.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

module.exports = {
  returnUserObject,
  formatDate,
};
