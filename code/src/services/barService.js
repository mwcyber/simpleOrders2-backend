// src/services/barService.js
const barRepository = require('../repositories/barRepository');

class BarService {
  async getAllBars(userId, pagination) {

    const bars = await barRepository.getAllBars(userId, pagination);
    const totalCount = await barRepository.getBarsCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { bars, totalCount, totalPages };
  }

  async getBarById(userId, barId) {
    return barRepository.getBarById(userId, barId);
  }

  async createBar(barData) {
    return barRepository.createBar(barData);
  }

  async updateBar(userId, barId, barData) {
    return barRepository.updateBar(userId, barId, barData);
  }

  async deleteBar(userId, barId) {
    return barRepository.deleteBar(userId, barId);
  }

  async searchBars(userId, queryParams, pagination) {
    const searchCriteria = {};

    // Mappa dei campi che possono essere utilizzati come criteri di ricerca
    const searchFields = ['name', 'type', 'address', 'phone', 'openingHours'];

    // Aggiungo i criteri di ricerca solo per i parametri specificati
    searchFields.forEach(field => {
        if (queryParams[field]) {
            // Aggiungo il criterio con l'espressione regolare per la ricerca case-insensitive
            searchCriteria[field] = new RegExp(queryParams[field], 'i');
        }
    });

    // Recupero gli oggetti corrispondendi ai criteri di ricerca
    const bars = await barRepository.searchBars(userId, searchCriteria, pagination);
    
    // Recupero il numero totale degli oggetti
    const totalCount = await barRepository.getBarsCount(searchCriteria);
    
    // Calcolo il numero totale di pagine con totale/dimensione pagina
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { bars, totalCount, totalPages };
  }
}

module.exports = new BarService();
