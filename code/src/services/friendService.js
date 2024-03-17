// src/services/friendService.js
const friendRepository = require('../repositories/friendRepository');

class friendService {
  async getAllfriends(userId, pagination) {

    const friends = await friendRepository.getAllFriends(userId, pagination);
    const totalCount = await friendRepository.getFriendsCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { friends, totalCount, totalPages };
  }

  async getFriendById(userId, friendId) {
    return friendRepository.getFriendById(userId, friendId);
  }

  async createFriend(userId, friendData) {
    return friendRepository.createFriend(userId, friendData);
  }

  async updateFriend(userId, friendId, friendData) {
    return friendRepository.updateFriend(userId, friendId, friendData);
  }

  async deleteFriend(userId, friendId) {
    return friendRepository.deleteFriend(userId, friendId);
  }

  async searchFriends(userId, queryParams, pagination) {
    const searchCriteria = {};

    // Mappa dei campi che possono essere utilizzati come criteri di ricerca
    const searchFields = ['nickname'];

    // Aggiungo i criteri di ricerca solo per i parametri specificati
    searchFields.forEach(field => {
        if (queryParams[field]) {
            // Aggiungo il criterio con l'espressione regolare per la ricerca case-insensitive
            searchCriteria[field] = new RegExp(queryParams[field], 'i');
        }
    });

    // Recupero gli oggetti corrispondendi ai criteri di ricerca
    const friends = await friendRepository.searchFriends(userId, searchCriteria, pagination);
    
    // Recupero il numero totale degli oggetti
    const totalCount = await friendRepository.getFriendsCount(searchCriteria);
    
    // Calcolo il numero totale di pagine con totale/dimensione pagina
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { friends, totalCount, totalPages };
  }
}

module.exports = new friendService();
