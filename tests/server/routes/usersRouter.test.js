require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const faker = require('faker');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const users = require('../knex')('users');
const { formatDate } = require('../../../server/utils/dataHelper');
const { createFakeUser, createFakeUserWithHashedPassword } = require('../../fakeData');

describe('testing the usersRouter', async () => {
  const fakePassword = faker.internet.password();
  let fakeUser;

  beforeEach(async (done) => {
    fakeUser = createFakeUserWithHashedPassword(fakePassword);
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
      expect(formatDate(user.birth_date)).toBe(formatDate(fakeUser.birth_date));
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
    const testUser = createFakeUser();

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
      const incompleteUser = {
        id: uuid(),
        first_name: "Ryan",
        last_name: "Shin",
        username: "ryan_shinster",
        email: "ryan_shin@gmail.com",
        password: "wiefhweihfwefwehfo",
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
    test('should return a 401 status code response when a JSON web token is available and not expired', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
      const request = {
        username: fakeUser.username,
        password: fakeUser.password,
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(401);
      expect(message).toBe(`${fakeUser.username} is already logged in!`);
    });

    test('should return a 200 status code response with the user object and JSON web token', async () => {
      const request = {
        username: fakeUser.username,
        password: fakePassword,
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": null,
        },
        body: JSON.stringify(request),
      });
      const user = await response.json();

      expect(response.status).toBe(200);
      expect(user.id).toBe(fakeUser.id);
      expect(user.first_name).toBe(fakeUser.first_name);
      expect(user.last_name).toBe(fakeUser.last_name);
      expect(user.username).toBe(fakeUser.username);
      expect(user.email).toBe(fakeUser.email);
      expect(user.password).toBe(fakeUser.password);
      expect(formatDate(user.birth_date)).toBe(formatDate(fakeUser.birth_date));
      expect(user.city).toBe(fakeUser.city);
      expect(user.state).toBe(fakeUser.state);
      expect(user.zipcode).toBe(fakeUser.zipcode);
      expect(user.annotation).toBe(fakeUser.annotation);
      expect(user.token).toBeDefined();
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
          "token": null,
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
          "token": null,
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(404);
      expect(message).toBe('Password did not match with the given username!');
    });

    test('should return a 500 status code when not providing any information', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/users/refresh_token', async () => {
    test('should return a 401 status code response when a JSON web token is not sent', async () => {
      const request = {
        username: fakeUser.username,
        password: 'wefoihwioefhiowehfiwfho',
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(401);
      expect(message).toBe('Session token is unavailable!');
    });

    test('should return a 200 status code with a new token and user object response when a JSON web token has expired', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1" });
      const request = {
        username: fakeUser.username,
        password: fakeUser.password,
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(request),
      });
      const user = await response.json();

      expect(response.status).toBe(200);
      expect(user.id).toBe(fakeUser.id);
      expect(user.first_name).toBe(fakeUser.first_name);
      expect(user.last_name).toBe(fakeUser.last_name);
      expect(user.username).toBe(fakeUser.username);
      expect(user.email).toBe(fakeUser.email);
      expect(user.password).toBe(fakeUser.password);
      expect(formatDate(user.birth_date)).toBe(formatDate(fakeUser.birth_date));
      expect(user.city).toBe(fakeUser.city);
      expect(user.state).toBe(fakeUser.state);
      expect(user.zipcode).toBe(fakeUser.zipcode);
      expect(user.annotation).toBe(fakeUser.annotation);
      expect(user.token).toBeDefined();
    });

    test('should return a 401 status code response when a JSON web token has not expired yet', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
      const request = {
        username: fakeUser.username,
        password: 'wefihwioefhehfhfoiw',
      };
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/users/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(request),
      });
      const { message } = await response.json();

      expect(response.status).toBe(401);
      expect(message).toBe('Token has not expired yet!');
    });
  });
});