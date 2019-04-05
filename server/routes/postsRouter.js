const uuid = require('uuid/v4');
const { Router } = require('express');

const PostModel = require('../models/postModel');
const { findPostsWithinRadius, findSurferPostById, createSurferPost } = require('../queries/posts');
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
            return newPost.getPost();
          });
          return res.status(200).jsonp({ posts });
        }
        return res.status(404).jsonp({ message: 'Post records not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
    .get('/:id', async ({ params: { id } }, res) => {
      try {
        const response = await findSurferPostById(posts, id);
        if (response) {
          const foundPost = new PostModel(response);
          return res.status(200).jsonp({ post: foundPost.getPost() });
        }
        return res.status(404).jsonp({ error: 'Surfer post could not be found!' });
      } catch (error) {
        return res.status(500).jsonp({ error });
      }
    })
    .post('/:user_id/create', verifySessionTokenForAccess, upload.single('image'), async ({ file, body }, res) => {
      const newSurferPostData = {
        id: uuid(),
        user_id: body.user_id,
        user_rating: body.user_rating,
        image_location_url: file ? `${file.location}.jpg` : null,
        lat: body.lat,
        lng: body.lng,
        post_content: body.post_content,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
      };
      try {
        const response = await createSurferPost(posts, newSurferPostData);
        const newPost = new PostModel(response);
        return res.status(200).jsonp({ post: newPost.getPost() });
      } catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
};

module.exports = postsRouter;