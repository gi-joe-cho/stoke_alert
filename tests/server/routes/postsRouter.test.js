require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const faker = require('faker');
const users = require('../knex')('users');
const posts = require('../knex')('posts');
const { createFakeUser, createFakePost } = require('../../fakeData');

describe('testing the postsRouter', async () => {
  let fakeUser;
  const fakePosts = [];

  beforeEach(async (done) => {
    fakeUser = createFakeUser();
    await users
      .clone()
      .insert(fakeUser);

    for (let i = 0; i < 10; i++) {
      const fakePost = createFakePost(fakeUser);
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
      const minLatitude = -99999;
      const maxLatitude = 99999;
      const minLongitude = -99999;
      const maxLongitude = 99999;
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts?min_lat=${minLatitude}&max_lat=${maxLatitude}&min_lng=${minLongitude}&max_lng=${maxLongitude}`, {
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
      const minLatitude = -99999;
      const maxLatitude = 99999;
      const minLongitude = -99999;
      const maxLongitude = 99999;
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts?min_lat=${minLatitude}&max_lat=${maxLatitude}&min_lng=${minLongitude}&max_lng=${maxLongitude}`, {
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

    test('it should return a 500 status code when not providing coordinates', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(500);
    });

    test('it should return a 404 status code when providing unreachable coordinates', async () => {
      const minLatitude = 0;
      const maxLatitude = 0;
      const minLongitude = 0;
      const maxLongitude = 0;
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts?min_lat=${minLatitude}&max_lat=${maxLatitude}&min_lng=${minLongitude}&max_lng=${maxLongitude}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(404);
    });
  });
});