require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const faker = require('faker');

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
      zipcode: '90007',
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
      expect(user.zipcode).toBe(fakeUser.zipcode);
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

  describe('POST /api/users/signup', async () => {
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
      zipcode: '92821',
      annotation: 'I am a software engineer who enjoys surfing.',
    };

    test('it should insert a new user to the users table and return a 200 status code with a message', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signup`, {
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
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fakeUser),
      });

      expect(response.status).toBe(400);
    });

    test('it should not insert user data with missing one non-nullable fields and should return a 500 error status code', async () => {
      const fakePassword = 'glutenfree';
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(fakePassword, saltRounds);
      const incompleteUser = {
        id: uuid(),
        first_name: "Ryan",
        last_name: "Shin",
        username: "ryan_shinster",
        email: "ryan_shin@gmail.com",
        password: hashedPassword,
        birth_date: new Date('08-08-1992'),
        city: "Irvine",
        state: "CA",
        annotation: "Ryan is a software engineer who enjoys gaming.",
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteUser),
      });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/users/signin', async () => {
    test('should return a 200 status code response with the user object and JSON web token', async () => {
      const request = {
        username: fakeUser.username,
        password: fakeUser.password,
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const user = await response.json();
      console.log(user);
    });

    test('should return a 404 status code response when user record is not found', async () => {
      const request = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(404);
      expect(message).toBe('User record is not found!');
    });

    test('should return a 404 status code response with a message saying the password did not match', async () => {
      const request = {
        username: fakeUser.username,
        password: faker.internet.password(),
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(404);
      expect(message).toBe('Password did not match with the given username!');
    });
  });
});