const { default: axios } = require('axios');
const { serverDomain } = require('../../configs/env.config');
const { getImageCollection } = require('../../utils/db');

// eslint-disable-next-line consistent-return
const postImages = async (req, res) => {
  try {
    const imageCollection = getImageCollection();
    const RECAPTCHA_SECRET_KEY = '6Lf8vCgqAAAAAFAn3mapDbs0G3H3JbtwtfKFpjp5';

    if (!req.body?.captchaValue) {
      return res.status(400).json({ error: 'CAPTCHA is required' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${req.body?.captchaValue}`;
    const response = await axios.post(verifyUrl);
    if (!response.data.success) {
      return res.status(400).json({ error: 'Invalid CAPTCHA response' });
    }
    const { email } = req.body;
    const user_images = req.files.map(
      (image) => `${serverDomain}/${image.filename}`
    );

    const document = {
      name: req.body.name,
      email: req.body.email,
      time: new Date(),
      images: user_images,
    };
    let result;
    const existed_uploader = await imageCollection.findOne({ email });
    if (!existed_uploader) {
      result = await imageCollection.insertOne(document);
    } else {
      result = await imageCollection.updateOne(
        { email },
        { $push: { images: { $each: user_images } } }
      );
    }
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving images' });
  }
};

module.exports = postImages;
