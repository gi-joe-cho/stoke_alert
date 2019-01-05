require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const users = require('../knex')('users');

describe('testing the usersRouter', async () => {
  let fakeUser;

  beforeEach(async (done) => {
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

  afterEach(async (done) => {
    await users
      .clone()
      .del();
    done();
  });

  describe('GET /api/users/:id', async () => {
    test('it should return a response with the found user', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/${fakeUser.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user } = await response.json();

      expect(response.status).toBe(200);
      expect(user.id).toBe(fakeUser.id);
      expect(user.first_name).toBe(fakeUser.first_name);
      expect(user.last_name).toBe(fakeUser.last_name);
      expect(user.username).toBe(fakeUser.username);
      expect(user.email).toBe(fakeUser.email);
      expect(user.password).toBe(fakeUser.password);
      expect(user.birth_date).toBe(fakeUser.birth_date.toISOString());
      expect(user.city).toBe(fakeUser.city);
      expect(user.state).toBe(fakeUser.state);
      expect(user.annotation).toBe(fakeUser.annotation);
    });

    test('it should return a 404 error and message when using an unavailable user ID', async () => {
      const fakeId = 'weiufgwufeigwifgi1893223';
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/${fakeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message } = await response.json();

      expect(response.status).toBe(404);
      expect(message).toBe('User record not found!');
    });
  });

  describe('POST /api/users/', async () => {
    const fakePassword = 'borax4thewin';
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(fakePassword, saltRounds);
    const testUser = {
      id: uuid(),
      first_name: 'Joseph',
      last_name: 'Cho',
      username: 'gijoecho',
      email: 'gijoecho@gmail.com',
      password: hashedPassword,
      birth_date: new Date('09-15-1991'),
      city: 'Brea',
      state: 'CA',
      annotation: 'I am a software engineer who enjoys surfing.',
    };

    test('it should insert a new user to the users table and return a 200 status code with a message', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testUser),
      });
      const { message } = await response.json();

      expect(response.status).toBe(200);
      expect(message).toBe(`${testUser.username} has been successfully added as a new user!`)
    });

    test('it should not insert the already available user and should return a 400 error status code with message', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testUser),
      });
      const { message } = await response.json();

      expect(response.status).toBe(400);
      expect(message).toBe(`${testUser.username} has been successfully added as a new user!`)
    });
  });
});