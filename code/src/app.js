// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/simpleorders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
