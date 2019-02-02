const uuid = require('uuid/v4');

const users = require('../knex')('users');
const { formatDate } = require('../../../server/utils/dataHelper');
const { createFakeUser } = require('../../fakeData');
const { findUserById, findUserByName, findUserByNameOrEmail, addNewUser } = require('../../../server/queries/users');

describe('users queries', async () => {
  let fakeUser;

  beforeEach(async (done) => {
     fakeUser = createFakeUser();
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

  describe('findUserById', async () => {
    test('it should return the inserted user by ID', async () => {
      const user = await findUserById(users, fakeUser.id);

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

    test('it should return undefined when providing unavailable ID', async () => {
      const fakeUserId = uuid();
      const user = await findUserById(users, fakeUserId);

      expect(user).toBe(undefined);
    });
  });

  describe('findUserByName', async () => {
    test('it should return the inserted user by username', async () => {
      const user = await findUserByName(users, fakeUser.username);

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

    test('it should return undefined when providing unavailable username', async () => {
      const fakeUserName = 'Borax4Life';
      const user = await findUserById(users, fakeUserName);

      expect(user).toBe(undefined);
    });
  });

  describe('findUserByNameOrEmail', async () => {
    test('it should return the inserted user by username and email', async () => {
      const user = await findUserByNameOrEmail(users, fakeUser.username, fakeUser.email);

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

    test('it should return the inserted user by providing available username and unavailable email', async () => {
      const fakeEmail = 'baller90210@gmail.com';
      const user = await findUserByNameOrEmail(users, fakeUser.username, fakeEmail);

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
  });

  describe('addNewUser', async () => {
    const testUser = createFakeUser();

    test('it should return the newly inserted user when added successfully.', async () => {
      const result = await addNewUser(users, testUser);
      const newUser = result[0];

      expect(newUser.id).toBe(testUser.id);
      expect(newUser.first_name).toBe(testUser.first_name);
      expect(newUser.last_name).toBe(testUser.last_name);
      expect(newUser.username).toBe(testUser.username);
      expect(newUser.email).toBe(testUser.email);
      expect(newUser.password).toBe(testUser.password);
      expect(formatDate(newUser.birth_date)).toBe(formatDate(testUser.birth_date));
      expect(newUser.city).toBe(testUser.city);
      expect(newUser.state).toBe(testUser.state);
      expect(newUser.zipcode).toBe(testUser.zipcode);
      expect(newUser.annotation).toBe(testUser.annotation);
    })
  });
});