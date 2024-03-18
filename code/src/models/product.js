// src/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  allergens: { type: [String], default: [], required: true },
  userId: { type: String, required: true },
  share: { type: Boolean, default: false, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
