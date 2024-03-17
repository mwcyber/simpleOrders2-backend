// src/repositories/productRepository.js
const Product = require('../models/product');

class ProductRepository {
  async getAllProducts(userId, pagination) {
    return Product.find({ $or: [{ userId: userId }, { share: true }] })
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getProductById(userId, productId) {
    return Product.findOne({ _id: productId, $or: [{ userId: userId }, { share: true }] });
  }

  async createProduct(productData) {
    return Product.create(productData);
  }

  async updateProduct(userId, productId, productData) {
    // Verifica se il prodotto appartiene all'utente corrente prima di aggiornarlo
    const existingProduct = await Product.findOne({ _id: productId, userId: userId });
    if (!existingProduct) {
      throw new Error('Not authorized');
    }

    return Product.findByIdAndUpdate(productId, productData, { new: true });
  }

  async deleteProduct(userId, productId) {
    // Verifica se il prodotto appartiene all'utente corrente prima di eliminarlo
    const existingProduct = await Product.findOne({ _id: productId, userId: userId });
    if (!existingProduct) {
      throw new Error('Not authorized');
    }

    return Product.findByIdAndDelete(productId);
  }

  async searchProducts(userId, searchCriteria, pagination) {
    return Product.find({ userId, ...searchCriteria })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getProductsCount(userId) {
    return Product.countDocuments({ userId });
  }
}

module.exports = new ProductRepository();
