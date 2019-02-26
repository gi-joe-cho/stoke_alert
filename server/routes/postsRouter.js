const { Router } = require('express');

const PostModel = require('../models/postModel');
const { findPostsWithinRadius } = require('../queries/posts');
const upload = require('../aws-sdk');

const singleUpload = upload.single('image');

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
    .post('/:user_id/create', async (req, res) => {
      singleUpload(req, res, (err, some) => {
        if (err) {
          return res.status(422).send({errors: [{ title: 'Image Upload Error', detail: err.message }] });
        }

        return res.json({'imageUrl': `${req.file.location}.jpg` });
      });
    })
};

module.exports = postsRouter;