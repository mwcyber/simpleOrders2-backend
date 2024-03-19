// src/services/orderService.js
const orderRepository = require('../repositories/orderRepository');

class orderService {
  async getAllOrders(userId, pagination) {

    const orders = await orderRepository.getAllOrders(userId, pagination);
    const totalCount = await orderRepository.getOrdersCount(userId);

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }

  async getOrderById(userId, orderId) {
    return orderRepository.getOrderById(userId, orderId);
  }

  async createOrder(userId, orderData) {
    orderData.userId = userId;
    return orderRepository.createOrder(orderData);
  }

  async updateOrder(userId, orderId, orderData) {
    return orderRepository.updateOrder(userId, orderId, orderData);
  }

  async deleteOrder(userId, orderId) {
    return orderRepository.deleteOrder(userId, orderId);
  }

  async searchOrders(authUserId, queryParams, pagination) {
    const searchCriteria = {};

    // Mappa dei campi che possono essere utilizzati come criteri di ricerca
    const searchFields = ['orderId', 'userId', 'createdAt', 'modifiedAt', 'barId', 'productId', 'friendId', 'quantity'];

    // Aggiungo i criteri di ricerca solo per i parametri specificati
    searchFields.forEach(field => {
        if (queryParams[field]) {
            // Aggiungo il criterio con l'espressione regolare per la ricerca case-insensitive
            searchCriteria[field] = new RegExp(queryParams[field], 'i');
        }
    });

    // Recupero gli oggetti corrispondendi ai criteri di ricerca
    const orders = await orderRepository.searchOrders(authUserId, searchCriteria, pagination);

    // Recupero il numero totale degli oggetti
    const totalCount = await orderRepository.getOrdersCount(authUserId);
    
    // Calcolo il numero totale di pagine con totale/dimensione pagina
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }
}

module.exports = new orderService();
