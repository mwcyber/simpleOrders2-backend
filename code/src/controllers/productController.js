// src/controllers/productController.js
const productService = require('../services/productService');

class productController {
    async getAllproducts(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { products, totalCount, totalPages } = await productService.getAllproducts(pagination);

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

    async getproductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getproductById(id);
            if (product.length === 0) {
                res.status(404).json({ message: 'products not found' });
            } else {
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createproduct(req, res) {
        const productData = req.body;
        try {
            const createdproduct = await productService.createproduct(productData);
            res.status(201).json(createdproduct);
        } catch (error) {
            res.status(400).json({ message: 'Error creating product' });
        }
    }

    async updateproduct(req, res) {
        const { id } = req.params;
        const productData = req.body;
        try {
            const updatedproduct = await productService.updateproduct(id, productData);
            res.status(200).json(updatedproduct);
        } catch (error) {
            res.status(404).json({ message: 'product not found' });
        }
    }

    async deleteproduct(req, res) {
        const { id } = req.params;
        try {
            await productService.deleteproduct(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'product not found' });
        }
    }

    async searchproducts(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, opening_hours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, opening_hours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { products, totalCount, totalPages } = await productService.searchproducts(queryParams, pagination);

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