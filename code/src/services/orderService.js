// src/services/orderService.js
const orderRepository = require('../repositories/orderRepository');

class orderService {
  async getAllorders(pagination) {

    const orders = await orderRepository.getAllorders(pagination);
    const totalCount = await orderRepository.getordersCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }

  async getorderById(orderId) {
    return orderRepository.getorderById(orderId);
  }

  async createorder(orderData) {
    return orderRepository.createorder(orderData);
  }

  async updateorder(orderId, orderData) {
    return orderRepository.updateorder(orderId, orderData);
  }

  async deleteorder(orderId) {
    return orderRepository.deleteorder(orderId);
  }

  async searchorders(queryParams, pagination) {
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

    const orders = await orderRepository.searchorders(searchCriteria, pagination);
    const totalCount = await orderRepository.getordersCount(searchCriteria);
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { orders, totalCount, totalPages };
  }
}

module.exports = new orderService();
