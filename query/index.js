const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {  
    const {type, data} = req.body

    if (type === 'PostCreated') {
        posts[data.id] = {...data, comments: []};
    }

    if (type === 'CommentCreated') {
        const {id, content, postId} = data;

        const post = posts[postId];
        post.comments.push({id, content})
    }

    console.log(posts);

    res.send({})
   })


app.listen(4002, () => {
  console.log('query 4002');
});
