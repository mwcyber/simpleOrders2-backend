// src/controllers/userController.js

const UserService = require('../services/userService');

class UserController {
  async getUserId(req, res) {
    try {
        const reqUserId = req.user.userId;
        const { username } = req.body;
      const userId = await UserService.getUserIdByUsername(username);

      if (userId == reqUserId) {
        res.status(200).json({ userId });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
