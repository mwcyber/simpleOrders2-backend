// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/api/v1/auth/register', authController.register);
router.post('/api/v1/auth/login', authController.login);

module.exports = router;