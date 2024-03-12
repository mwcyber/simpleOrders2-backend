// src/repositories/barRepository.js
const Bar = require('../models/bar');

class BarRepository {
  async getAllBars(pagination) {
    return Bar.find()
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getBarById(barId) {
    return Bar.findById(barId);
  }

  async createBar(barData) {
    return Bar.create(barData);
  }

  async updateBar(barId, barData) {
    return Bar.findByIdAndUpdate(barId, barData, { new: true }); //{ new: true }: Opzionale, specifica di restituire il documento aggiornato.
  }

  async deleteBar(barId) {
    return Bar.findByIdAndDelete(barId);
  }

  async searchBars(searchCriteria, pagination) {
    return Bar.find(searchCriteria)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getBarsCount() {
    return Bar.countDocuments();
  }

}

module.exports = new BarRepository();
