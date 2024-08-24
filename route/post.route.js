const express = require('express');
const router = express.Router();
const { create,
    update,
    deletePosts,
    deleteCloud} = require('../controller/post.controller');

const upload = require('../config/multer')

router.post('/create', upload.single('image'),create);

router.patch('/update/:postsId', update);

router.delete('/delete/:postsId', deletePosts);

module.exports = router;