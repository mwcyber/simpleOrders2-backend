// src/repositories/barRepository.js
const Bar = require('../models/bar');

class BarRepository {
  async getAllBars(userId, pagination) {
    return Bar.find({ $or: [{ userId: userId }, { share: true }] })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getBarById(userId, barId) {
    return Bar.findOne({ _id: barId, $or: [{ userId: userId }, { share: true }] });
  }

  async createBar(barData) {
    return Bar.create(barData);
  }

  async updateBar(userId, barId, barData) {
    // Verifica se il bar appartiene all'utente corrente prima di aggiornarlo
    const existingBar = await Bar.findOne({ _id: barId, userId: userId });
    if (!existingBar) {
      throw new Error('Not authorized');
    }

    return Bar.findByIdAndUpdate(barId, barData, { new: true }); //{ new: true }: Opzionale, specifica di restituire il documento aggiornato.
  }

  async deleteBar(userId, barId) {
    // Verifica se il bar appartiene all'utente corrente prima di eliminarlo
    const existingBar = await Bar.findOne({ _id: barId, userId: userId });
    if (!existingBar) {
      throw new Error('Not authorized');
    }

    return Bar.findByIdAndDelete(barId);
  }

  async searchBars(userId, searchCriteria, pagination) {
    console.log(searchCriteria);
    return Bar.find({ userId, ...searchCriteria })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getBarsCount(userId) {
    return Bar.countDocuments({ userId });
  }

  async getBarsByUserId(userId, pagination) {
    return Bar.find({ userId })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }
}

module.exports = new BarRepository();
