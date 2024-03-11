// src/controllers/controllersauthController.js
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const authService = require('../services/authService');
const userRepository = require('../repositories/userRepository');

class AuthController {
    async register(req, res) {
        try {
            const { username, password } = req.body;

            // Verifico se l'utente esiste già
            const existingUser = await userRepository.getUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Registrazione dell'utente
            await authService.registerUser({ username, password });

            res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Verifico se l'utente esiste
            const user = await userRepository.getUserByUsername(username);
            
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            
            // Verifico la password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generazione del token JWT
            const token = authMiddleware.generateToken({ username: user.username });

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();
