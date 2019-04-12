const faker = require('faker');
const UserModel = require('../../../server/models/userModel');
const { createFakeUserWithHashedPassword }= require('../../fakeData');

describe('UserModel', async () => {
  const fakeUser = createFakeUserWithHashedPassword(faker.internet.password());
  const user = new UserModel({
    id: fakeUser.id,
    username: fakeUser.username,
    first_name: fakeUser.first_name,
    last_name: fakeUser.last_name,
    email: fakeUser.email,
    password: fakeUser.password,
    birth_date: fakeUser.birth_date,
    city: fakeUser.city,
    state: fakeUser.state,
    zipcode: fakeUser.zipcode,
    annotation: fakeUser.annotation,
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  });

  test('get id', () => {
    expect(user.id).toBe(fakeUser.id);
  });

  test('get username', () => {
    expect(user.username).toBe(fakeUser.username);
  });

  test('get first_name', () => {
    expect(user.first_name).toBe(fakeUser.first_name);
  });

  test('get last_name', () => {
    expect(user.last_name).toBe(fakeUser.last_name);
  });

  test('get email', () => {
    expect(user.email).toBe(fakeUser.email);
  });

  test('get password', () => {
    expect(user.password).toBe(fakeUser.password);
  });

  test('get birth_date', () => {
    expect(user.birth_date).toBe(fakeUser.birth_date);
  });

  test('get city', () => {
    expect(user.city).toBe(fakeUser.city);
  });

  test('get state', () => {
    expect(user.state).toBe(fakeUser.state);
  });

  test('get zipcode', () => {
    expect(user.zipcode).toBe(fakeUser.zipcode);
  });

  test('get created_at', () => {
    expect(user.created_at).toBeDefined();
  });

  test('get updated_at', () => {
    expect(user.updated_at).toBeDefined();
  });

  test('getUser', () => {
    const userObj = user.getUser();
    expect(userObj.id).toBe(fakeUser.id);
    expect(userObj.username).toBe(fakeUser.username);
    expect(userObj.first_name).toBe(fakeUser.first_name);
    expect(userObj.last_name).toBe(fakeUser.last_name);
    expect(userObj.email).toBe(fakeUser.email);
    expect(userObj.password).toBe(fakeUser.password);
    expect(userObj.birth_date).toBe(fakeUser.birth_date);
    expect(userObj.city).toBe(fakeUser.city);
    expect(userObj.state).toBe(fakeUser.state);
    expect(userObj.zipcode).toBe(fakeUser.zipcode);
    expect(userObj.annotation).toBe(fakeUser.annotation);
    expect(userObj.created_at).toBeDefined();
    expect(userObj.updated_at).toBeDefined();
  });
});