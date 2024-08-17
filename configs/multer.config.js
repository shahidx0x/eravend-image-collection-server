const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp|heif|heic|svg|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only!');
}

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },
  filename(req, file, cb) {
    const uniqueSuffix = new ObjectId().toString();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    cb(null, uniqueSuffix + extension);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = {
  imageUpload,
};
