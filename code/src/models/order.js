// src/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  barId: { type: String, required: true },
  productId: { type: String, required: true },
  friendId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
