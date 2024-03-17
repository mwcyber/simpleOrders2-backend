// src/routes/mainRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');
const barRoutes = require('./barsRoutes');
const productRoutes = require('./productsRoutes');
const orderRoutes = require('./ordersRoutes');
const friendRoutes = require('./friendsRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Endpoint pubblico
router.use('/api/v1/auth', authRoutes);

// Middleware JWT per tutti gli endpoint successivi
router.use(authMiddleware.protectEndpoints);

// Endpoint protetti dall'autenticazione JWT
router.use('/api/v1/bars', barRoutes);
router.use('/api/v1/products', productRoutes);
router.use('/api/v1/orders', orderRoutes);
router.use('/api/v1/friends', friendRoutes);
router.use('/api/v1/users', userRoutes);

module.exports = router;
