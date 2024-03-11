// src/services/authService.js
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const authMiddleware = require('../middleware/authMiddleware');

class AuthService {
  async registerUser({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ username, password: hashedPassword });
    return user;
  }

  async loginUser({ username, password }) {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
      return null; // Utente non trovato
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Password non valida
    }

    return user;
  }

  generateToken(user) {
    return authMiddleware.generateToken({ user_id: user.user_id, username: user.username });
  }
}

module.exports = new AuthService();