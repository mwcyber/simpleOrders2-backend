// src/routes/mainRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const barRoutes = require('./barsRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/api/v1/auth', authRoutes); // Endpoint pubblico
router.use(authMiddleware.protectEndpoints); // Middleware JWT per tutti gli endpoint successivi
router.use('/api/v1/bars', barRoutes); // Endpoint protetti dall'autenticazione JWT

module.exports = router;
