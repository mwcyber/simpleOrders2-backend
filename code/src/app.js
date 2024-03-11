// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const barsRoutes = require('./routes/barsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/simpleorders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Usa le route per le entità
app.use(barsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
