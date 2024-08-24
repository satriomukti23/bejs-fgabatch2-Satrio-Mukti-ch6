const prisma = require('../config/prisma');
const imageKitConf = require('../config/imagekit');

const createPost = async (req) => {

        const image = req.file 

        if(!image) {
            return {
                status: 400,
                message: 'Image is required',
            }
        }

        try {
            
        const {tittle , caption} = req.body;

        const uploadImage = await imageKitConf.upload({
            file: image.buffer.toString('base64'),
            fileName: image.originalname,
            folder: '/binarassets'
        });

        const result = await prisma.posts.create({
            data: {
                tittle,
                caption,
                image: uploadImage.url,
            }
        })
        return result

        } catch (error) {
            throw new Error(error);
        }

}

const updatePost = async (req, postId) => {
    try {
      const { tittle, caption } = req.body;
      const image = req.file;
  
      let updatedImage = null;
  
      if (image) {
        const uploadImage = await imageKitConf.upload({
          file: image.buffer.toString('base64'),
          fileName: image.originalname,
          folder: '/binarassets'
        });
  
        updatedImage = uploadImage.url;
      }
  
      const result = await prisma.posts.update({
        where: { id: postId },
        data: {
          tittle,
          caption,
          image: updatedImage || undefined 
        }
      });
  
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const deletePost = async(postId) => {
    try {
      const deletedPost = await prisma.posts.delete({
        where: {
          id: postId
        }
      });
      return deletedPost;
    } catch (error) {
      throw new Error(error);
    }
  }
module.exports = {
    createPost,
    updatePost,
    deletePost
}

