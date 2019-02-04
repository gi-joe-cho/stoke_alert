const PostModel = require('../../../server/models/postModel');
const posts = require('../knex')('posts');
const { createFakeUser, createFakePost }= require('../../fakeData');

describe('PostModel', async () => {
  const fakeUser = createFakeUser();
  const fakePost = createFakePost(fakeUser);
  const post = new PostModel({
    ...fakePost,
    created_at: new Date(),
    updated_at: new Date(),
    first_name: fakeUser.first_name,
    last_name: fakeUser.last_name,
    username: fakeUser.username,
    email: fakeUser.email,
  });

  test('get id', () => {
    expect(post.id).toBe(fakePost.id);
  });

  test('get user_id', () => {
    expect(post.user_id).toBe(fakePost.user_id);
  });

  test('get user_rating', () => {
    expect(post.user_rating).toBe(fakePost.user_rating);
  });

  test('get up_votes', () => {
    expect(post.up_votes).toBe(fakePost.up_votes);
  });

  test('get down_votes', () => {
    expect(post.down_votes).toBe(fakePost.down_votes);
  });

  test('get image_location_url', () => {
    expect(post.image_location_url).toBe(fakePost.image_location_url);
  });

  test('get post_content', () => {
    expect(post.post_content).toBe(fakePost.post_content);
  });

  test('get lat', () => {
    expect(post.lat).toBe(fakePost.lat);
  });

  test('get lng', () => {
    expect(post.lng).toBe(fakePost.lng);
  });

  test('get city', () => {
    expect(post.city).toBe(fakePost.city);
  });

  test('get state', () => {
    expect(post.state).toBe(fakePost.state);
  });

  test('get zipcode', () => {
    expect(post.zipcode).toBe(fakePost.zipcode);
  });

  test('get created_at', () => {
    expect(post.created_at).toBeDefined();
  });

  test('get updated_at', () => {
    expect(post.updated_at).toBeDefined();
  });

  test('get first_name', () => {
    expect(post.first_name).toBe(fakeUser.first_name);
  });

  test('get last_name', () => {
    expect(post.last_name).toBe(fakeUser.last_name);
  });

  test('get username', () => {
    expect(post.username).toBe(fakeUser.username);
  });

  test('get email', () => {
    expect(post.email).toBe(fakeUser.email);
  });
});