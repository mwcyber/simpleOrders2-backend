// src/services/userService.js

const UserRepository = require('../repositories/userRepository');

class UserService {
  async getUserIdByUsername(username) {
    const user = await UserRepository.getUserByUsername(username);
    return user ? user._id : null;
  }
}

module.exports = new UserService();
