const faker = require('faker');
const { returnUserObject } = require('../../../server/utils/dataHelper');

describe('Testing dataHelper util methods', () => {
  describe('returnUserObject', () => {
    test('it should return the user object after passing in the data', async () => {
      const data = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        birth_date: faker.date.between('1980-01-01', '2000-12-31'),
        city: faker.address.city(),
        state: faker.address.state(),
        zipcode: faker.address.zipCode(),
        annotation: faker.lorem.sentence(),
      };
      const user = returnUserObject(data);

      expect(user.id).toBeDefined();
      expect(user.first_name).toBe(data.first_name);
      expect(user.last_name).toBe(data.last_name);
      expect(user.username).toBe(data.username);
      expect(user.password).toBeDefined();
      expect(user.email).toBe(data.email);
      expect(user.birth_date).toBe(data.birth_date);
      expect(user.city).toBe(data.city);
      expect(user.state).toBe(data.state);
      expect(user.zipcode).toBe(data.zipcode);
      expect(user.annotation).toBe(data.annotation);
    });
  });
});