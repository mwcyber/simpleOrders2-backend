// src/routes/userRoutes.js
const express = require('express');
const productController = require('../controllers/userController');

const router = express.Router();

router.post('/', productController.getUserId);

module.exports = router;