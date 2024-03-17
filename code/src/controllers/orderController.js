// src/controllers/orderController.js
const orderService = require('../services/orderService');

class orderController {
    async getAllorders(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { orders, totalCount, totalPages } = await orderService.getAllorders(pagination);

            if (orders.length === 0) {
                res.status(404).json({ message: 'orders not found' });
            } else {
                res.status(200).json({
                    data: orders,
                    pagination: {
                        totalItems: totalCount,
                        pageSize: pagination.pageSize,
                        currentPage: pagination.page,
                        totalPages,
                        links: {
                            prev: pagination.page > 1 ? `/api/v1/orders?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : null,
                            next: pagination.page < totalPages ? `/api/v1/orders?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : null,
                        },
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' + error });
        }
    }

    async getorderById(req, res) {
        const { id } = req.params;
        try {
            const order = await orderService.getorderById(id);
            if (order.length === 0) {
                res.status(404).json({ message: 'orders not found' });
            } else {
                res.status(200).json(order);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createorder(req, res) {
        const orderData = req.body;
        try {
            const createdorder = await orderService.createorder(orderData);
            res.status(201).json(createdorder);
        } catch (error) {
            res.status(400).json({ message: 'Error creating order' });
        }
    }

    async updateorder(req, res) {
        const { id } = req.params;
        const orderData = req.body;
        try {
            const updatedorder = await orderService.updateorder(id, orderData);
            res.status(200).json(updatedorder);
        } catch (error) {
            res.status(404).json({ message: 'order not found' });
        }
    }

    async deleteorder(req, res) {
        const { id } = req.params;
        try {
            await orderService.deleteorder(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'order not found' });
        }
    }

    async searchorders(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, opening_hours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, opening_hours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { orders, totalCount, totalPages } = await orderService.searchorders(queryParams, pagination);

                if (orders.length === 0) {
                    res.status(404).json({ message: 'No orders found matching the search criteria' });
                } else {
                    res.status(200).json({
                        data: orders,
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

module.exports = new orderController();