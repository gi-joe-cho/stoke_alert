require('dotenv').config({ path: '../../../.env' });
const uuid = require('uuid/v4');
const faker = require('faker');
const posts = require('../knex')('posts');

describe('testing the postsRouter', async () => {
  beforeEach(async (done) => {
    const user_ratings = ["Awful", "Bad", "Average", "Good", "Great", "Gnarly"];
    const randomUserRatingsIndex = Math.floor(Math.random() * user_ratings.length);
    for (let i = 0; i < 10; i++) {
      const fakePost = {
        id: uuid(),
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
      const response = await fetch(`${process.env.DEV_API_DOMAIN}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { posts } = await response.json();

      console.log(posts);
      expect(response.status).toBe(200);
    });
  });
});