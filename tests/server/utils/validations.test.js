const uuid = require('uuid');
const bcrypt = require('bcrypt');
const knex = require('../knex');
const { checkForDuplicateNameAndEmail } = require('../../../server/utils/validations');

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

    test('the next function should be called when providing already available email', async () => {
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
});