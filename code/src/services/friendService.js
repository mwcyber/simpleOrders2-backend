// src/services/friendService.js
const friendRepository = require('../repositories/friendRepository');

class friendService {
  async getAllfriends(pagination) {

    const friends = await friendRepository.getAllfriends(pagination);
    const totalCount = await friendRepository.getfriendsCount();

    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { friends, totalCount, totalPages };
  }

  async getfriendById(friendId) {
    return friendRepository.getfriendById(friendId);
  }

  async createfriend(friendData) {
    return friendRepository.createfriend(friendData);
  }

  async updatefriend(friendId, friendData) {
    return friendRepository.updatefriend(friendId, friendData);
  }

  async deletefriend(friendId) {
    return friendRepository.deletefriend(friendId);
  }

  async searchfriends(queryParams, pagination) {
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

    const friends = await friendRepository.searchfriends(searchCriteria, pagination);
    const totalCount = await friendRepository.getfriendsCount(searchCriteria);
    const totalPages = Math.ceil(totalCount / pagination.pageSize);

    return { friends, totalCount, totalPages };
  }
}

module.exports = new friendService();
