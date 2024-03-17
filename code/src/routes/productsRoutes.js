// src/routes/productsRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllproducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/search', productController.searchProducts);

module.exports = router;