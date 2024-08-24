const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer(
    { storage : storage,
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10,
    }
    });

module.exports = upload;

