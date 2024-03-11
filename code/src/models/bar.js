// src/models/bar.js
const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  bar_id: String,
  name: String,
  type: String,
  address: String,
  phone: String,
  opening_hours: String,
  user_id: String,
  share: Boolean,
});

module.exports = mongoose.model('Bar', barSchema);