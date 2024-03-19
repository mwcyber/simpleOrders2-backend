// src/services/productService.js
const productRepository = require('../repositories/productRepository');

class productService {
  async getAllproducts(userId, pagination) {

    const products = await productRepository.getAllProducts(userId, pagination);
    const totalCount = await productRepository.getProductsCount(userId);

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { products, totalCount, totalPages };
  }

  async getProductById(userId, productId) {
    return productRepository.getProductById(userId, productId);
  }

  async createProduct(userId, productData) {
    productData.userId = userId;
    console.log(productData);
    return productRepository.createProduct(productData);
  }

  async updateProduct(userId, productId, productData) {
    return productRepository.updateProduct(userId, productId, productData);
  }

  async deleteProduct(userId, productId) {
    return productRepository.deleteProduct(userId, productId);
  }

  async searchProducts(userId, queryParams, pagination) {
    const searchCriteria = {};

    // Mappa dei campi che possono essere utilizzati come criteri di ricerca
    const searchFields = ['name', 'price', 'description', 'allergens'];

    // Aggiungo i criteri di ricerca solo per i parametri specificati
    searchFields.forEach(field => {
        if (queryParams[field]) {
            // Aggiungo il criterio con l'espressione regolare per la ricerca case-insensitive
            searchCriteria[field] = new RegExp(queryParams[field], 'i');
        }
    });

    // Recupero gli oggetti corrispondendi ai criteri di ricerca
    const products = await productRepository.searchProducts(userId, searchCriteria, pagination);
    
    // Recupero il numero totale degli oggetti
    const totalCount = await productRepository.getProductsCount(userId);
    
    // Calcolo il numero totale di pagine con totale/dimensione pagina
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { products, totalCount, totalPages };
  }
}

module.exports = new productService();
