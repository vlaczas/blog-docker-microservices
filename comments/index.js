const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const comments = {};

app.get("/api/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/api/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comment = comments[req.params.id] || [];

  comment.push({ id: commentId, content, postId: req.params.id });

  comments[req.params.id] = comment;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id }
  })

  res.status(201).send({ id: commentId, content, postId: req.params.id });
});

app.post('/events', (req, res) => {
  console.log('event', req.body.type);

  res.send({})
})

app.listen(4001, () => {
  console.log("comments 4001");
});
