const findPostsWithinRadius = (posts, minLat, maxLat, minLng, maxLng) =>
  posts
    .clone()
    .select([
      'posts.id',
      'posts.user_id',
      'posts.user_rating',
      'posts.post_content',
      'posts.up_votes',
      'posts.down_votes',
      'posts.image_location_url',
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
    .whereBetween('lat', [minLat, maxLat])
    .whereBetween('lng', [minLng, maxLng])
    .limit(10)
    .orderBy('posts.updated_at', 'desc')
    .then(posts => posts);

const createSurferPost = (posts, newPost) =>
  posts
    .clone()
    .insert(newPost)
    .returning('*')
    .then(foundPosts => {
      return posts.select([
        'posts.id',
        'posts.user_id',
        'posts.user_rating',
        'posts.post_content',
        'posts.up_votes',
        'posts.down_votes',
        'posts.image_location_url',
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
      .where('posts.id', foundPosts[0].id)
      .then(queriedPosts => queriedPosts[0]);
    });

module.exports = {
  findPostsWithinRadius,
  createSurferPost,
};
