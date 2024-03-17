// src/repositories/friendRepository.js
const Friend = require('../models/friend');

class FriendRepository {
  async getAllFriends(userId, pagination) {
    return Friend.find({ $or: [{ userId: userId }, { share: true }] })
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize);
  }

  async getFriendById(userId, friendId) {
    return Friend.findOne({ _id: friendId, $or: [{ userId: userId }, { share: true }] });
  }

  async createFriend(friendData) {
    return Friend.create(friendData);
  }

  async updateFriend(userId, friendId, friendData) {
    // Verifica se l'amico appartiene all'utente corrente prima di aggiornarlo
    const existingFriend = await Friend.findOne({ _id: friendId, userId: userId });
    if (!existingFriend) {
      throw new Error('Not authorized');
    }

    return Friend.findByIdAndUpdate(friendId, friendData, { new: true });
  }

  async deleteFriend(userId, friendId) {
    // Verifica se l'amico appartiene all'utente corrente prima di eliminarlo
    const existingFriend = await Friend.findOne({ _id: friendId, userId: userId });
    if (!existingFriend) {
      throw new Error('Not authorized');
    }

    return Friend.findByIdAndDelete(friendId);
  }

  async searchFriends(userId, searchCriteria, pagination) {
    return Friend.find({ userId, ...searchCriteria })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
  }

  async getFriendsCount(userId) {
    return Friend.countDocuments({ userId });
  }
}

module.exports = new FriendRepository();
