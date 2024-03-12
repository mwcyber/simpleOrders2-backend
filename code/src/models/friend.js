// src/models/friend.js
const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  friend_id: { type: String, required: false, unique: true },
  nickname: { type: String, required: true },
  user_id: { type: String, required: true },
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
