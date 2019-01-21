const findPostsWithinRadius = (posts, lat, lng) =>
  posts
    .clone()
    .rightJoin('users', 'posts.user_id', 'users.id')
    .where("lat", "<=", lat)
    .andWhere("lng", "<=", lng)
    .orderBy("updated_at", "desc")
    .limit(10)
    .then(posts => posts);

module.exports = {
  findPostsWithinRadius,
};
