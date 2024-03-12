// src/routes/barsRoutes.js
const express = require('express');
const barController = require('../controllers/barController');

const router = express.Router();

router.get('/', barController.getAllBars);
router.get('/:id', barController.getBarById);
router.post('/', barController.createBar);
router.put('/:id', barController.updateBar);
router.delete('/:id', barController.deleteBar);
router.post('/search', barController.searchBars);

module.exports = router;