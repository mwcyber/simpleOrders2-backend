// src/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
