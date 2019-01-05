require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const users = require('../knex')('users');

describe('testing the usersRouter', async () => {
  let fakeUser;

  beforeAll(async (done) => {
    const fakePassword = 'andiechoie1991';
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(fakePassword, saltRounds);
    fakeUser = {
      id: uuid(),
      first_name: 'Andie',
      last_name: 'Choie',
      username: 'achoie91',
      email: 'andie_choie@gmail.com',
      password: hashedPassword,
      birth_date: new Date('02-01-1991'),
      city: 'Los Angeles',
      state: 'CA',
      annotation: 'I am an architectural engineer who enjoys powerlifting.',
    };
    await users
      .clone()
      .insert(fakeUser);
    done();
  });

  afterAll(async (done) => {
    await users
      .clone()
      .del();
    done();
  });

  describe('GET /api/users/:id', async () => {
    test('it should return a response with the found user', async () => {
      const response = await fetch(`http://localhost:9000/api/users/${fakeUser.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json();

      console.log(response);
      console.log(user);
    });
  });
});