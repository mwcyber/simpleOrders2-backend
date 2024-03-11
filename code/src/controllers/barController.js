// src/controllers/barController.js
const barService = require('../services/barService');

class BarController {
    async getAllBars(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { bars, totalCount, totalPages } = await barService.getAllBars(pagination);

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
        const { id } = req.params;
        try {
            const bar = await barService.getBarById(id);
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
            res.status(400).json({ message: 'Error creating bar' });
        }
    }

    async updateBar(req, res) {
        const { id } = req.params;
        const barData = req.body;
        try {
            const updatedBar = await barService.updateBar(id, barData);
            res.status(200).json(updatedBar);
        } catch (error) {
            res.status(404).json({ message: 'Bar not found' });
        }
    }

    async deleteBar(req, res) {
        const { id } = req.params;
        try {
            await barService.deleteBar(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'Bar not found' });
        }
    }

    async searchBars(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, opening_hours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, opening_hours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { bars, totalCount, totalPages } = await barService.searchBars(queryParams, pagination);

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