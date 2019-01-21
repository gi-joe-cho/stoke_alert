const { Router } = require('express');

const { findPostsWithinRadius } = require('../queries/posts');

const postsRouter = knex => {
  const posts = knex('posts');
  const router = new Router();

  return router
    .get('/', async ({ params: { lat, lng } }, res) => {
      try {
        const posts = await findPostsWithinRadius(posts, lat, lng);
        if (posts.length > 0) {
          return res.status(200).jsonp({ posts: [ ...posts ] });
        }
        return res.status(404).jsonp({ message: 'Post records not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
};

module.exports = postsRouter;