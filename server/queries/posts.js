const findPostsWithinRadius = (posts, lat, lng) =>
  posts
    .clone()
    .select([
      'posts.id',
      'posts.user_id',
      'posts.user_rating',
      'posts.up_votes',
      'posts.down_votes',
      'posts.post_content',
      'posts.lat',
      'posts.lng',
      'posts.city',
      'posts.state',
      'posts.zipcode',
      'posts.created_at',
      'posts.updated_at',
      'users.username',
      'users.first_name',
      'users.last_name',
      'users.email',
    ])
    .rightJoin('users', 'posts.user_id', 'users.id')
    .where('lat', '<=', lat)
    .andWhere('lng', '<=', lng)
    .limit(10)
    .orderBy('posts.updated_at', 'desc')
    .then(posts => posts);

module.exports = {
  findPostsWithinRadius,
};
