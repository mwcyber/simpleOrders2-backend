// src/repositories/orderRepository.js
const Order = require('../models/order');

class OrderRepository {
  async getAllOrders(userId, pagination) {
    return Order.find({ $or: [{ userId: userId }, { share: true }] })
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getOrderById(userId, orderId) {
    return Order.findOne({ _id: orderId, $or: [{ userId: userId }, { share: true }] });
  }

  async createOrder(orderData) {
    return Order.create(orderData);
  }

  async updateOrder(userId, orderId, orderData) {
    // Verifica se l'ordine appartiene all'utente corrente prima di aggiornarlo
    const existingOrder = await Order.findOne({ _id: orderId, userId: userId });
    if (!existingOrder) {
      throw new Error('Not authorized');
    }

    return Order.findByIdAndUpdate(orderId, orderData, { new: true });
  }

  async deleteOrder(userId, orderId) {
    // Verifica se l'ordine appartiene all'utente corrente prima di eliminarlo
    const existingOrder = await Order.findOne({ _id: orderId, userId: userId });
    if (!existingOrder) {
      throw new Error('Not authorized');
    }

    return Order.findByIdAndDelete(orderId);
  }

  async searchOrders(userId, searchCriteria, pagination) {
    return Order.find({ userId, ...searchCriteria })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getOrdersCount(userId) {
    return Order.countDocuments({ userId });
  }
}

module.exports = new OrderRepository();
