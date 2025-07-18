// src/controllers/productController.js
const productService = require('../services/productService');

class productController {
    async getAllproducts(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { products, totalCount, totalPages } = await productService.getAllproducts(userId, pagination);

            if (products.length === 0) {
                res.status(404).json({ message: 'products not found' });
            } else {
                res.status(200).json({
                    data: products,
                    pagination: {
                        totalItems: totalCount,
                        pageSize: pagination.pageSize,
                        currentPage: pagination.page,
                        totalPages,
                        links: {
                            prev: pagination.page > 1 ? `/api/v1/products?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : null,
                            next: pagination.page < totalPages ? `/api/v1/products?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : null,
                        },
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' + error });
        }
    }

    async getProductById(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            const product = await productService.getProductById(userId, id);
            if (product.length === 0) {
                res.status(404).json({ message: 'products not found' });
            } else {
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createProduct(req, res) {
        const userId = req.user.userId;
        const productData = req.body;
        try {
            const createdProduct = await productService.createProduct(userId, productData);
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(400).json({ message: 'Error creating product' + error});
        }
    }

    async updateProduct(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        const productData = req.body;
        try {
            const updatedProduct = await productService.updateProduct(userId, id, productData);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(404).json({ message: 'product not found' });
        }
    }

    async deleteProduct(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            await productService.deleteProduct(userId, id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'product not found' });
        }
    }

    async searchProducts(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, openingHours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, openingHours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { products, totalCount, totalPages } = await productService.searchProducts(userId, queryParams, pagination);

                if (products.length === 0) {
                    res.status(404).json({ message: 'No products found matching the search criteria' });
                } else {
                    res.status(200).json({
                        data: products,
                        pagination: {
                            totalItems: totalCount,
                            pageSize: pagination.pageSize,
                            currentPage: page,
                            totalPages,
                            links: {
                                prev: pagination.page > 1 ? `/api/v1/search?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : null,
                                next: pagination.page < totalPages ? `/api/v1/search?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : null,
                            },
                        },
                    });
                }
            } catch (error) {
                res.status(500).json({ message: 'Internal server error' + error });
            }
        } else {
            return res.status(400).json({ message: 'At least one search parameter is required.' });
        }
    }

}

module.exports = new productController();