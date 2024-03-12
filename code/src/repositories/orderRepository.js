// src/repositories/orderRepository.js
const Order = require('../models/order');

class OrderRepository {
  async getAllOrders(pagination) {
    return Order.find()
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getOrderById(orderId) {
    return Order.findById(orderId);
  }

  async createOrder(orderData) {
    return Order.create(orderData);
  }

  async updateOrder(orderId, orderData) {
    return Order.findByIdAndUpdate(orderId, orderData, { new: true });
  }

  async deleteOrder(orderId) {
    return Order.findByIdAndDelete(orderId);
  }

  async searchOrders(searchCriteria, pagination) {
    return Order.find(searchCriteria)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getOrdersCount() {
    return Order.countDocuments();
  }
}

module.exports = new OrderRepository();
