// src/controllers/barController.js
const barService = require('../services/barService');

class BarController {
    async getAllBars(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { bars, totalCount, totalPages } = await barService.getAllBars(userId, pagination);

            if (bars.length === 0) {
                res.status(404).json({ message: 'Bars not found' });
            } else {
                res.status(200).json({
                    data: bars,
                    pagination: {
                        totalItems: totalCount,
                        pageSize: pagination.pageSize,
                        currentPage: pagination.page,
                        totalPages,
                        links: {
                            prev: pagination.page > 1 ? `/api/v1/bars?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : null,
                            next: pagination.page < totalPages ? `/api/v1/bars?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : null,
                        },
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' + error });
        }
    }

    async getBarById(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            const bar = await barService.getBarById(userId, id);
            if (bar.length === 0) {
                res.status(404).json({ message: 'Bars not found' });
            } else {
                res.status(200).json(bar);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createBar(req, res) {
        const barData = req.body;
        try {
            const createdBar = await barService.createBar(barData);
            res.status(201).json(createdBar);
        } catch (error) {
            res.status(400).json({ message: 'Error creating bar' + error});
        }
    }

    async updateBar(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        const barData = req.body;
        try {
            const updatedBar = await barService.updateBar(userId, id, barData);
            res.status(200).json(updatedBar);
        } catch (error) {
            res.status(404).json({ message: 'Bar not found' + error});
        }
    }

    async deleteBar(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            await barService.deleteBar(userId, id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'Bar not found' });
        }
    }

    async searchBars(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, openingHours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, openingHours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { bars, totalCount, totalPages } = await barService.searchBars(userId, queryParams, pagination);

                if (bars.length === 0) {
                    res.status(404).json({ message: 'No bars found matching the search criteria' });
                } else {
                    res.status(200).json({
                        data: bars,
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

module.exports = new BarController();