// src/routes/ordersRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.getAllorders);
router.get('/:id', orderController.getorderById);
router.post('/', orderController.createorder);
router.put('/:id', orderController.updateorder);
router.delete('/:id', orderController.deleteorder);
router.post('/search', orderController.searchorders);

module.exports = router;