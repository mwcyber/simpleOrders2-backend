// src/repositories/productRepository.js
const Product = require('../models/product');

class ProductRepository {
  async getAllProducts(pagination) {
    return Product.find()
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getProductById(productId) {
    return Product.findById(productId);
  }

  async createProduct(productData) {
    return Product.create(productData);
  }

  async updateProduct(productId, productData) {
    return Product.findByIdAndUpdate(productId, productData, { new: true });
  }

  async deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
  }

  async searchProducts(searchCriteria, pagination) {
    return Product.find(searchCriteria)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getProductsCount() {
    return Product.countDocuments();
  }
}

module.exports = new ProductRepository();
