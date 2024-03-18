// src/models/friend.js
const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  userId: { type: String, required: true }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
