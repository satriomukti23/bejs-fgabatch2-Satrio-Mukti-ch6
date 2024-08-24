const express = require('express');
const app = express();
const port = 3000;
const POST_CONTROLLER = require('./route/post.route');

app.use(express.json());
app.use('/post', POST_CONTROLLER);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})