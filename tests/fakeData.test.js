const faker = require('faker');
const { createFakeUser, createFakeUserWithHashedPassword, createFakePost } = require('./fakeData');

describe('Testing fakeData util methods', () => {
  describe('createFakeUser', () => {
    test('it should return the fakeUser object with the included fields', async () => {
      const fakeUser = createFakeUser();
      const fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'birth_date', 'city', 'state', 'zipcode', 'annotation'];

      fields.forEach(field => {
        expect(fakeUser).toHaveProperty(field);
      });
    });
  });

  describe('createFakeUserWithHashedPassword', () => {
    test('it should return the fakeUser object with the included fields', async () => {
      const fakePassword = faker.internet.password();
      const fakeUser = createFakeUserWithHashedPassword(fakePassword);
      const fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'birth_date', 'city', 'state', 'zipcode', 'annotation'];

      fields.forEach(field => {
        expect(fakeUser).toHaveProperty(field);
      });
    });
  });

  describe('createFakePost', () => {
    test('it should return the fakePost object with the included fields', async () => {
      const fakeUser = createFakeUser();
      const fakePost = createFakePost(fakeUser);
      const fields = ['id', 'user_id', 'user_rating', 'up_votes', 'down_votes', 'image_location_url', 'post_content', 'lat', 'lng', 'city', 'state', 'zipcode'];

      fields.forEach(field => {
        expect(fakePost).toHaveProperty(field);
      });
    });
  });
});