require('dotenv').config({ path: '../../../.env' });
const faker = require('faker');
const users = require('../knex')('users');
const posts = require('../knex')('posts');
const { findPostsWithinRadius } = require('../../../server/queries/posts');
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

  describe('GET /api/posts', async () => {
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
});