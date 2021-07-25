const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comment = comments[req.params.id] || [];

  comment.push({ id: commentId, content });

  comments[req.params.id] = comment;

  res.status(201).send(comment);
});

app.listen(4001, () => {
  console.log("port 4001");
});
