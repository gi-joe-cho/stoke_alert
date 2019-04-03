const uuid = require('uuid/v4');
const { Router } = require('express');

const PostModel = require('../models/postModel');
const { findPostsWithinRadius, createSurferPost } = require('../queries/posts');
const { verifySessionTokenForAccess } = require('../utils/validations');
const upload = require('../aws-sdk');

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
    .post('/:user_id/create', verifySessionTokenForAccess, upload.single('image'), async ({ file, body }, res) => {
      const newSurferPostData = {
        id: uuid(),
        user_id: body.user_id,
        user_rating: body.user_rating,
        image_location_url: `${file.location}.jpg`,
        lat: body.lat,
        lng: body.lng,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
      };
      try {
        const response = await createSurferPost(posts, newSurferPostData);
        const newPost = new PostModel(response);
        return res.status(200).json({ post: newPost.post() });
      } catch(error) {
        return res.status(500).json({'error': error});
      }
    })
};

module.exports = postsRouter;