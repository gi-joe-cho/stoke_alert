require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const faker = require('faker');
const users = require('../knex')('users');
const posts = require('../knex')('posts');
const { findPostsWithinRadius, findSurferPostById, createSurferPost } = require('../../../server/queries/posts');
const { createFakeUserWithHashedPassword, createFakePost } = require('../../fakeData');

describe('testing the postsRouter', async () => {
  const fakePassword = faker.internet.password();
  let fakeUser;
  let fakePost;

  beforeEach(async (done) => {
    fakeUser = createFakeUserWithHashedPassword(fakePassword);
    await users
      .clone()
      .insert(fakeUser);

    fakePost = createFakePost(fakeUser);
    await posts
      .clone()
      .insert(fakePost);

    done();
  });

  afterEach(async (done) => {
    await posts
      .clone()
      .del();
    done();
  });

  describe('findPostsWithinRadius', async () => {
    test('it should return a response with 1 surfer post', async () => {
      const minLatitude = -99999;
      const maxLatitude = 99999;
      const minLongitude = -99999;
      const maxLongitude = 99999;
      const response = await findPostsWithinRadius(posts, minLatitude, maxLatitude, minLongitude, maxLongitude);
      const post = response[0];

      expect(response.length).toBe(1);
      expect(post.id).toBe(fakePost.id);
      expect(post.user_id).toBe(fakePost.user_id);
      expect(post.user_rating).toBe(fakePost.user_rating);
      expect(post.up_votes).toBe(fakePost.up_votes);
      expect(post.down_votes).toBe(fakePost.down_votes);
      expect(post.image_location_url).toBe(fakePost.image_location_url);
      expect(post.post_content).toBe(fakePost.post_content);
      expect(post.lat).toBe(fakePost.lat);
      expect(post.lng).toBe(fakePost.lng);
      expect(post.city).toBe(fakePost.city);
      expect(post.state).toBe(fakePost.state);
      expect(post.zipcode).toBe(fakePost.zipcode);
      expect(post.first_name).toBe(fakeUser.first_name);
      expect(post.last_name).toBe(fakeUser.last_name);
      expect(post.email).toBe(fakeUser.email);
    });
  });

  describe('findSurferPostById', async () => {
    test('it should return undefined results if the post is not available', async () => {
      const response = await findSurferPostById(posts, faker.random.uuid());

      expect(response).toBeUndefined();
    });

    test('it should return surfer post information associated by the ID', async () => {
      const response = await findSurferPostById(posts, fakePost.id);

      expect(response.id).toBe(fakePost.id);
      expect(response.user_id).toBe(fakeUser.id);
      expect(response.user_rating).toBe(fakePost.user_rating);
      expect(response.post_content).toBe(fakePost.post_content);
      expect(response.up_votes).toBe(fakePost.up_votes);
      expect(response.down_votes).toBe(fakePost.down_votes);
      expect(response.image_location_url).toBe(fakePost.image_location_url);
      expect(response.lat).toBe(fakePost.lat);
      expect(response.lng).toBe(fakePost.lng);
      expect(response.city).toBe(fakePost.city);
      expect(response.state).toBe(fakePost.state);
      expect(response.zipcode).toBe(fakePost.zipcode);
      expect(response.created_at).toBeDefined();
      expect(response.updated_at).toBeDefined();
      expect(response.username).toBe(fakeUser.username);
      expect(response.first_name).toBe(fakeUser.first_name);
      expect(response.last_name).toBe(fakeUser.last_name);
      expect(response.email).toBe(fakeUser.email);
    });
  });

  describe('createSurferPost', async () => {
    test('it should create a new surfer post and return the new surfer post information', async () => {
      const body = {
        id: uuid(),
        user_id: fakeUser.id,
        user_rating: 'Good',
        lat: faker.random.number(),
        lng: faker.random.number(),
        image_location_url: faker.image.imageUrl(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipcode: faker.address.zipCode(),
        post_content: faker.lorem.sentence(),
      };
      const response = await createSurferPost(posts, body);

      expect(response.user_id).toBe(body.user_id);
      expect(response.user_rating).toBe(body.user_rating);
      expect(response.lat).toBe(body.lat);
      expect(response.lng).toBe(body.lng);
      expect(response.city).toBe(body.city);
      expect(response.state).toBe(body.state);
      expect(response.zipcode).toBe(body.zipcode);
      expect(response.username).toBe(fakeUser.username);
      expect(response.first_name).toBe(fakeUser.first_name);
      expect(response.last_name).toBe(fakeUser.last_name);
      expect(response.email).toBe(fakeUser.email);
    });
  });
});