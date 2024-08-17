const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('../configs/env.config');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Collections
let imageCollection;

const connectDB = async () => {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
  console.log('Database Connected!');

  const database = client.db('eravend-image-collection');
  imageCollection = database.collection('images');
};

const getImageCollection = () => imageCollection;

module.exports = {
  connectDB,
  getImageCollection,
};
