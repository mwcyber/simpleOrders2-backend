// src/routes/barsRoutes.js
const express = require('express');
const barController = require('../controllers/barController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/api/v1/bars', authMiddleware.protectEndpoints);

router.get('/api/v1/bars', barController.getAllBars);
router.get('/api/v1/bars/:id', barController.getBarById);
router.post('/api/v1/bars', barController.createBar);
router.put('/api/v1/bars/:id', barController.updateBar);
router.delete('/api/v1/bars/:id', barController.deleteBar);
router.post('/api/v1/bars/search', barController.searchBars);

module.exports = router;