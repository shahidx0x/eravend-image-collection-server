require('dotenv').config();

const serverDomain = process.env.SERVER_DOMAIN;
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI || 'mongodb://localhost:27017';

module.exports = {
  serverDomain,
  port,
  uri,
};
