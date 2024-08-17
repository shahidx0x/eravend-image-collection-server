const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./utils/db');
const { port } = require('./configs/env.config');
const imageRoutes = require('./routes/imageRoutes');

// TODO: add origin and credential true when use cookies
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('images'));

app.use('/api', imageRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to EraVend's Image Collection Server");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

module.exports = app;
