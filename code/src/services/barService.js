// src/services/barService.js
const barRepository = require('../repositories/barRepository');

class BarService {
  async getAllBars(pagination) {

    const bars = await barRepository.getAllBars(pagination);
    const totalCount = await barRepository.getBarsCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { bars, totalCount, totalPages };
  }

  async getBarById(barId) {
    return barRepository.getBarById(barId);
  }

  async createBar(barData) {
    return barRepository.createBar(barData);
  }

  async updateBar(barId, barData) {
    return barRepository.updateBar(barId, barData);
  }

  async deleteBar(barId) {
    return barRepository.deleteBar(barId);
  }

  async searchBars(queryParams, pagination) {
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

    const bars = await barRepository.searchBars(searchCriteria, pagination);
    const totalCount = await barRepository.getBarsCount(searchCriteria);
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { bars, totalCount, totalPages };
  }
}

module.exports = new BarService();
