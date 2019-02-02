const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const knex = require('./queries/knex');
const mainRouter = require('./routes/mainRouter');

express()
  .use(cors())
  .use(bodyParser.json())
  .use('/api', mainRouter(knex))
  .listen(process.env.SERVER_PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Server started on PORT ${process.env.SERVER_PORT}`);
    }
  });

