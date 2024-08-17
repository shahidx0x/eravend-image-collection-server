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

    const document = {
      name: req.body.name,
      email: req.body.email,
      time: new Date(),
      images: [],
    };
    req.files.forEach((image) => document.images.push(`${serverDomain}/${image.filename}`));

    const result = await imageCollection.insertOne(document);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving images' });
  }
};

module.exports = postImages;
