// src/services/orderService.js
const orderRepository = require('../repositories/orderRepository');

class orderService {
  async getAllOrders(userId, pagination) {

    const orders = await orderRepository.getAllOrders(userId, pagination);
    const totalCount = await orderRepository.getOrdersCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }

  async getOrderById(userId, orderId) {
    return orderRepository.getOrderById(userId, orderId);
  }

  async createOrder(orderData) {
    try {
      const { userId, barId, orders } = orderData;
      const createdOrders = [];
  
      for (const order of orders) {
        const { productId, friendId, quantity } = order;
        const newOrder = { userId, barId, productId, friendId, quantity };
        const createdOrder = await orderRepository.createOrder(newOrder);
        createdOrders.push(createdOrder);
      }
  
      return createdOrders;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(userId, orderId, orderData) {
    return orderRepository.updateOrder(userId, orderId, orderData);
  }

  async deleteOrder(userId, orderId) {
    return orderRepository.deleteOrder(userId, orderId);
  }

  async searchOrders(userId, queryParams, pagination) {
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
    const orders = await orderRepository.searchOrders(userId, searchCriteria, pagination);

    // Recupero il numero totale degli oggetti
    const totalCount = await orderRepository.getOrdersCount(searchCriteria);
    
    // Calcolo il numero totale di pagine con totale/dimensione pagina
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }
}

module.exports = new orderService();
