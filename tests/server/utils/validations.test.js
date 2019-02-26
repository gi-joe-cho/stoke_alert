const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { checkForDuplicateNameAndEmail, checkSessionTokenExists, validateSessionTokenExpiration } = require('../../../server/utils/validations');

describe('Testing all of the validations util methods', () => {
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
    await knex('users')
      .clone()
      .insert(fakeUser);
    done();
  });

  afterEach(async (done) => {
    await knex('users')
      .clone()
      .del();
    done();
  });

  describe('checkForDuplicationNameAndEmail', async () => {
    const res = {
      status: jest.fn(() => ({
        json: jest.fn(),
      })),
    };
    const next = jest.fn();

    test('the next function should be called when providing already available username', async () => {
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
        },
      };
      await checkForDuplicateNameAndEmail(knex('users'))(req, res, next);

      expect(res.status).toBeCalled();
    });

    test('the status function should be called when providing unavailable email', async () => {
      const req = {
        body: {
          username: 'fakerrrrrr',
          email: fakeUser.email,
        },
      };
      await checkForDuplicateNameAndEmail(knex('users'))(req, res, next);

      expect(res.status).toBeCalled();
    });

    test('the next function should be called when providing unavailable username and email', async () => {
      const req = {
        body: {
          username: 'fakerrrrrr',
          email: 'faker@gmail.com',
        },
      };
      await checkForDuplicateNameAndEmail(knex('users'))(req, res, next);

      expect(next).toBeCalled();
    });
  });

  describe('checkSessionTokenExists', async () => {
    const res = {
      status: jest.fn(() => ({
        jsonp: jest.fn(),
      })),
    };
    const next = jest.fn();

    test('should call the next function when a token is not provided', async () => {
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
          token: null,
        },
      };
      await checkSessionTokenExists(req, res, next);

      expect(next).toBeCalled();
    });

    test('should return a 401 status code error when providing a token', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
          token,
        },
      };
      await checkSessionTokenExists(req, res, next);

      expect(res.status).toBeCalled();
    });
  });

  describe('validateSessionTokenExpiration', async () => {
    const res = {
      status: jest.fn(() => ({
        jsonp: jest.fn(),
      })),
    };
    const next = jest.fn();

    test('should return a 401 status code error when not providing a session token', async () => {
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
          token: null,
        },
      };
      await validateSessionTokenExpiration(req, res, next);

      expect(res.status).toBeCalled();
    });

    test('should return a 401 status code error when the token still has not expired yet', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
          token,
        },
      };
      await validateSessionTokenExpiration(req, res, next);

      expect(res.status).toBeCalled();
    });

    test('should call the next function when the token expired', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1' });
      const req = {
        body: {
          username: fakeUser.username,
          email: 'faker@gmail.com',
          token,
        },
      };
      await validateSessionTokenExpiration(req, res, next);

      expect(next).toBeCalled();
    });
  });
});