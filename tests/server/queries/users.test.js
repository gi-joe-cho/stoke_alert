const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const users = require('../knex')('users');
const { findUserById, findUserByName, findUserByNameOrEmail, addNewUser } = require('../../../server/queries/users');

describe('users queries', async () => {
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

  describe('findUserById', async () => {
    test('it should return the inserted user by ID', async () => {
      const user = await findUserById(users, fakeUser.id);

      expect(user.id).toBe(fakeUser.id);
      expect(user.first_name).toBe(fakeUser.first_name);
      expect(user.last_name).toBe(fakeUser.last_name);
      expect(user.username).toBe(fakeUser.username);
      expect(user.email).toBe(fakeUser.email);
      expect(user.password).toBe(fakeUser.password);
      expect(user.birth_date.toISOString()).toBe(fakeUser.birth_date.toISOString());
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
      expect(user.birth_date.toISOString()).toBe(fakeUser.birth_date.toISOString());
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
      expect(user.birth_date.toISOString()).toBe(fakeUser.birth_date.toISOString());
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
      expect(user.birth_date.toISOString()).toBe(fakeUser.birth_date.toISOString());
      expect(user.city).toBe(fakeUser.city);
      expect(user.state).toBe(fakeUser.state);
      expect(user.zipcode).toBe(fakeUser.zipcode);
      expect(user.annotation).toBe(fakeUser.annotation);
    });
  });

  describe('addNewUser', async () => {
    const testPassword = 'gijoecho';
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(testPassword, saltRounds);
    const testUser = {
      id: uuid(),
      first_name: 'Joseph',
      last_name: 'Cho',
      username: 'gi_cho',
      email: 'gi_cho@gmail.com',
      password: hashedPassword,
      birth_date: new Date('09-15-1991'),
      city: 'Brea',
      state: 'CA',
      zipcode: '92821',
      annotation: 'I am a musician who enjoys software engineering.',
    };

    test('it should return the newly inserted user when added successfully.', async () => {
      const result = await addNewUser(users, testUser);
      const newUser = result[0];

      expect(newUser.id).toBe(testUser.id);
      expect(newUser.first_name).toBe(testUser.first_name);
      expect(newUser.last_name).toBe(testUser.last_name);
      expect(newUser.username).toBe(testUser.username);
      expect(newUser.email).toBe(testUser.email);
      expect(newUser.password).toBe(testUser.password);
      expect(newUser.birth_date.toISOString()).toBe(testUser.birth_date.toISOString());
      expect(newUser.city).toBe(testUser.city);
      expect(newUser.state).toBe(testUser.state);
      expect(newUser.zipcode).toBe(testUser.zipcode);
      expect(newUser.annotation).toBe(testUser.annotation);
    })
  });
});