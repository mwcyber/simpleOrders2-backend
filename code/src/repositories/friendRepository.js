// src/repositories/friendRepository.js
const Friend = require('../models/friend');

class FriendRepository {
  async getAllFriends(pagination) {
    return Friend.find()
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getFriendById(friendId) {
    return Friend.findById(friendId);
  }

  async createFriend(friendData) {
    return Friend.create(friendData);
  }

  async updateFriend(friendId, friendData) {
    return Friend.findByIdAndUpdate(friendId, friendData, { new: true });
  }

  async deleteFriend(friendId) {
    return Friend.findByIdAndDelete(friendId);
  }

  async searchFriends(searchCriteria, pagination) {
    return Friend.find(searchCriteria)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getFriendsCount() {
    return Friend.countDocuments();
  }
}

module.exports = new FriendRepository();
