// src/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: false, unique: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
  bar_id: { type: String, required: true },
  product_id: { type: String, required: true },
  friend_id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
