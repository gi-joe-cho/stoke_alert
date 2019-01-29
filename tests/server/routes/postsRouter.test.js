require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const faker = require('faker');
const users = require('../knex')('users');
const posts = require('../knex')('posts');

describe('testing the postsRouter', async () => {
  const fakePassword = 'andiechoie1991';
  let fakeUser;

  beforeEach(async (done) => {
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

    const user_ratings = ["Awful", "Bad", "Average", "Good", "Great", "Gnarly"];
    const randomUserRatingsIndex = Math.floor(Math.random() * user_ratings.length);
    for (let i = 0; i < 10; i++) {
      const fakePost = {
        id: uuid(),
        user_id: fakeUser.id,
        user_rating: user_ratings[randomUserRatingsIndex],
        up_votes: faker.random.number(),
        down_votes: faker.random.number(),
        image_location_url: faker.image.imageUrl(),
        post_content: faker.lorem.sentence(),
        lat: faker.random.number() * 1.000,
        lng: faker.random.number() * 1.000,
        city: faker.address.city(),
        state: faker.address.state(),
        zipcode: faker.address.zipCode(),
      };

      await posts
        .clone()
        .insert(fakePost);
    }

    done();
  });

  afterEach(async (done) => {
    await posts
      .clone()
      .del();
    done();
  });

  describe('GET /api/posts', async () => {
    test('it should return a response with the list of surfer posts', async () => {
      const maxLatitude = 99999;
      const maxLongitude = 99999;
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts?lat=${maxLatitude}&lng=${maxLongitude}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { posts } = await response.json();

      expect(response.status).toBe(200);
    });
  });
});