const uuid = require('uuid/v4');
const faker = require('faker');

const user_ratings = ["Awful", "Bad", "Average", "Good", "Great", "Gnarly"];

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(async () => {
      // Inserts seed entries
      for (let i = 0; i < 50; i++) {
        await knex('posts').insert([
          {
            id: uuid(),
            user_rating: user_ratings[Math.random() * user_ratings.length],
            up_votes: faker.random.number(),
            down_votes: faker.random.number(),
            image_location_url: faker.image.imageUrl(),
            post_content: faker.lorem.sentence(),
            lat: faker.random.number() * 1.000,
            lng: faker.random.number() * 1.000,
            city: faker.address.city(),
            state: faker.address.state(),
            zipcode: faker.address.zipCode(),
          },
        ]);
      }
    });
};
