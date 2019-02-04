const { Router } = require('express');

const PostModel = require('../models/postModel');
const { findPostsWithinRadius } = require('../queries/posts');

const postsRouter = knex => {
  const posts = knex('posts');
  const router = new Router();

  return router
    .get('/', async ({ query: { min_lat, max_lat, min_lng, max_lng } }, res) => {
      try {
        const data = await findPostsWithinRadius(posts, min_lat, max_lat, min_lng, max_lng);
        if (data.length > 0) {
          const posts = data.map(post => {
            const newPost = new PostModel(post);
            return newPost.post();
          });
          return res.status(200).jsonp({ posts });
        }
        return res.status(404).jsonp({ message: 'Post records not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
};

module.exports = postsRouter;