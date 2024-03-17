// src/services/productService.js
const productRepository = require('../repositories/productRepository');

class productService {
  async getAllproducts(pagination) {

    const products = await productRepository.getAllproducts(pagination);
    const totalCount = await productRepository.getproductsCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { products, totalCount, totalPages };
  }

  async getproductById(productId) {
    return productRepository.getproductById(productId);
  }

  async createproduct(productData) {
    return productRepository.createproduct(productData);
  }

  async updateproduct(productId, productData) {
    return productRepository.updateproduct(productId, productData);
  }

  async deleteproduct(productId) {
    return productRepository.deleteproduct(productId);
  }

  async searchproducts(queryParams, pagination) {
    const searchCriteria = {};

    // Aggiungo i criteri di ricerca solo per i parametri specificati
    if (queryParams.name) {
      searchCriteria.name = new RegExp(queryParams.name, 'i');
    }
    if (queryParams.type) {
      searchCriteria.type = new RegExp(queryParams.type, 'i');
    }
    if (queryParams.address) {
      searchCriteria.address = new RegExp(queryParams.address, 'i');
    }
    if (queryParams.phone) {
      searchCriteria.phone = new RegExp(queryParams.phone, 'i');
    }
    if (queryParams.opening_hours) {
      searchCriteria.opening_hours = new RegExp(queryParams.opening_hours, 'i');
    }

    const products = await productRepository.searchproducts(searchCriteria, pagination);
    const totalCount = await productRepository.getproductsCount(searchCriteria);
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { products, totalCount, totalPages };
  }
}

module.exports = new productService();
