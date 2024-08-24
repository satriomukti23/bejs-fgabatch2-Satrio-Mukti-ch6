const {
    createPost,
    updatePost,
    deletePost
} = require('../model/post.model')
const prisma = require('../config/prisma')
const imageKitConf = require('../config/imagekit')

const create =  async (req,res) => {
    
    try {
        const post = await createPost(req);

        return res.status(201).json({
            message: "Post created successfully",
            data: post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const update = async(req,res) => {

    try {
        const postsId = req.params.postsId;
        const updatedPost = await updatePost(req, postsId);
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui post' });
      }
}

const deletePosts = async (req, res) => {
    try {
      const deletedPost = await deletePost(req.params.postsId);
      res.status(200).json({
        message: 'Post berhasil dihapus',
        data: deletedPost,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus post' });
    }
  };


module.exports = {
    create,
    update,
    deletePosts,
}