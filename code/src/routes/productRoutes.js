// src/routes/productsRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllproducts);
router.get('/:id', productController.getproductById);
router.post('/', productController.createproduct);
router.put('/:id', productController.updateproduct);
router.delete('/:id', productController.deleteproduct);
router.post('/search', productController.searchproducts);

module.exports = router;