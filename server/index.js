const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("HELLO WORLD!");
});

app.listen(9000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("SERVER STARTED ON PORT 9000");
  }
});

