const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/api/posts', (req, res) => {
  res.send(posts);
});

app.post('/api/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');

  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('port 4000');
});
