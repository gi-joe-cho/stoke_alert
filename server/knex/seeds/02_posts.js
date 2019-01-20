const uuid = require('uuid/v4');
const faker = require('faker');

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  const user_ratings = ["Awful", "Bad", "Average", "Good", "Great", "Gnarly"];
  return knex('posts').del()
    .then(async () => {
      // Inserts seed entries
      for (let i = 0; i < 50; i++) {
        const randomUserRatingsIndex = Math.floor(Math.random() * user_ratings.length);
        await knex('posts').insert([
          {
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
          },
        ]);
      }
    });
};
