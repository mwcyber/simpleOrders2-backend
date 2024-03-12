// src/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: false, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  allergens: { type: [String], default: [] },
  user_id: { type: String, required: false },
  share: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
