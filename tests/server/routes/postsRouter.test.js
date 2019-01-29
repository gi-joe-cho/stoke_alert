require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const faker = require('faker');
const users = require('../knex')('users');
const posts = require('../knex')('posts');

describe('testing the postsRouter', async () => {
  const fakePassword = 'andiechoie1991';
  let fakeUser;
  const fakePosts = [];

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
      fakePosts.push(fakePost);

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
    test('it should return a response with 10 surfer posts', async () => {
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
      expect(posts.count).toBe(fakePosts.count)
    });

    test('it should return the correct post data', async () => {
      const maxLatitude = 99999;
      const maxLongitude = 99999;
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts?lat=${maxLatitude}&lng=${maxLongitude}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { posts } = await response.json();
      const firstSurferPost = posts[0];
      const surferPostData = fakePosts.find(surferPost => surferPost.id === firstSurferPost.id);

      expect(firstSurferPost.id).toBe(surferPostData.id);
      expect(firstSurferPost.user_rating).toBe(surferPostData.user_rating);
      expect(firstSurferPost.up_votes).toBe(surferPostData.up_votes);
      expect(firstSurferPost.down_votes).toBe(surferPostData.down_votes);
      expect(firstSurferPost.image_location_url).toBe(surferPostData.image_location_url);
      expect(firstSurferPost.post_content).toBe(surferPostData.post_content);
      expect(firstSurferPost.lat).toBe(surferPostData.lat);
      expect(firstSurferPost.lng).toBe(surferPostData.lng);
      expect(firstSurferPost.city).toBe(surferPostData.city);
      expect(firstSurferPost.state).toBe(surferPostData.state);
      expect(firstSurferPost.zipcode).toBe(surferPostData.zipcode);
      expect(firstSurferPost.user.id).toBe(fakeUser.id);
      expect(firstSurferPost.user.first_name).toBe(fakeUser.first_name);
      expect(firstSurferPost.user.last_name).toBe(fakeUser.last_name);
      expect(firstSurferPost.user.email).toBe(fakeUser.email);
    });
  });
});