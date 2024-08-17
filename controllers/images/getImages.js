const { getImageCollection } = require('../../utils/db');

const getImages = async (req, res) => {
  try {
    const imageCollection = getImageCollection();
    const images = await imageCollection.find().toArray();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving images' });
  }
};

module.exports = getImages;
