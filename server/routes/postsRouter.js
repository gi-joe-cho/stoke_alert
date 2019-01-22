const { Router } = require('express');

const PostModel = require('../models/postModel');
const { findPostsWithinRadius } = require('../queries/posts');

const postsRouter = knex => {
  const posts = knex('posts');
  const router = new Router();

  return router
    .get('/', async ({ query: { lat, lng } }, res) => {
      try {
        const data = await findPostsWithinRadius(posts, lat, lng);
        if (data.length > 0) {
          return res.status(200).jsonp({ posts: [ ...data ] });
        }
        return res.status(404).jsonp({ message: 'Post records not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
};

module.exports = postsRouter;