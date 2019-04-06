require('dotenv').config({ path: '../../../.env' });
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
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

  describe('GET /api/posts/:id', async () => {
    test('it should throw a 404 error if the surfer post cannot be found when passing a non-existent post ID', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts/${faker.random.uuid()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message } = await response.json();

      expect(response.status).toBe(404);
      expect(message).toBe('Surfer post could not be found!');
    });

    test('it should return surfer post information when providing the available post ID', async () => {
      const selectedPost = await posts.select('*').from('posts').first();
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts/${selectedPost.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { post } = await response.json();

      expect(response.status).toBe(200);
      expect(post.id).toBe(selectedPost.id);
      expect(post.user_rating).toBe(selectedPost.user_rating);
      expect(post.up_votes).toBe(selectedPost.up_votes);
      expect(post.down_votes).toBe(selectedPost.down_votes);
      expect(post.image_location_url).toBe(selectedPost.image_location_url);
      expect(post.post_content).toBe(selectedPost.post_content);
      expect(post.lat).toBe(selectedPost.lat);
      expect(post.lng).toBe(selectedPost.lng);
      expect(post.city).toBe(selectedPost.city);
      expect(post.state).toBe(selectedPost.state);
      expect(post.zipcode).toBe(selectedPost.zipcode);
      expect(post.created_at).toBeDefined();
      expect(post.updated_at).toBeDefined();
      expect(post.user.id).toBe(fakeUser.id);
      expect(post.user.username).toBe(fakeUser.username);
      expect(post.user.first_name).toBe(fakeUser.first_name);
      expect(post.user.last_name).toBe(fakeUser.last_name);
      expect(post.user.email).toBe(fakeUser.email);
    });
  });

  describe('POST /api/posts/:user_id/create', async () => {
    test('it should throw a 401 error if no token is provided', async () => {
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts/${fakeUser.id}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createFakePost(fakeUser)),
      });
      const { message } = await response.json();

      expect(response.status).toBe(401);
      expect(message).toBe('Session token is unavailable!');
    });

    test('it should throw a 401 error if token has expired', async () => {
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1" });
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts/${fakeUser.id}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(createFakePost(fakeUser)),
      });
      const { message } = await response.json();

      expect(response.status).toBe(401);
      expect(message).toBe("Token has expired! Try signing in again!");
    });

    test('it should throw a 401 error if token has expired', async () => {
      const fakePost = createFakePost(fakeUser);
      const jwtSign = promisify(jwt.sign);
      const token = await jwtSign({ password: fakeUser.password }, process.env.JWT_TOKEN_SECRET, { expiresIn: "5h" });
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts/${fakeUser.id}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(fakePost),
      });
      const { post } = await response.json();

      expect(response.status).toBe(200);
      expect(post.id).toBeDefined();
      expect(post.user_rating).toBe(fakePost.user_rating);
      expect(post.up_votes).toBe(0);
      expect(post.down_votes).toBe(0);
      expect(post.image_location_url).toBeNull();
      expect(post.post_content).toBe(fakePost.post_content);
      expect(post.lat).toBe(fakePost.lat);
      expect(post.lng).toBe(fakePost.lng);
      expect(post.city).toBe(fakePost.city);
      expect(post.state).toBe(fakePost.state);
      expect(post.zipcode).toBe(fakePost.zipcode);
      expect(post.created_at).toBeDefined();
      expect(post.updated_at).toBeDefined();
      expect(post.user.id).toBe(fakeUser.id);
      expect(post.user.first_name).toBe(fakeUser.first_name);
      expect(post.user.last_name).toBe(fakeUser.last_name);
      expect(post.user.email).toBe(fakeUser.email);
    });
  });
});