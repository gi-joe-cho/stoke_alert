const faker = require('faker');
const uuid = require('uuid/v4');

const createFakeUser = () => {
  return {
    id: uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    birth_date: faker.date.between('1980-01-01', '2000-12-31'),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode(),
    annotation: faker.lorem.sentence(),
  };
};

const createFakePost = user => {
  const user_ratings = ["Awful", "Bad", "Average", "Good", "Great", "Gnarly"];
  const randomUserRatingsIndex = Math.floor(Math.random() * user_ratings.length);
  return {
    id: uuid(),
    user_id: user.id,
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
  }
};

module.exports = {
  createFakeUser,
  createFakePost,
};