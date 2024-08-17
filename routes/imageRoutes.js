const express = require('express');
const postImages = require('../controllers/images/postImages');
const { imageUpload } = require('../configs/multer.config');
const getImages = require('../controllers/images/getImages');

const router = express.Router();

router.get('/images', getImages);
router.post('/images', imageUpload.array('images', 120), postImages);

module.exports = router;
