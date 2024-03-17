// src/controllers/friendController.js
const friendService = require('../services/friendService');

class friendController {
    async getAllfriends(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { friends, totalCount, totalPages } = await friendService.getAllfriends(pagination);

            if (friends.length === 0) {
                res.status(404).json({ message: 'friends not found' });
            } else {
                res.status(200).json({
                    data: friends,
                    pagination: {
                        totalItems: totalCount,
                        pageSize: pagination.pageSize,
                        currentPage: pagination.page,
                        totalPages,
                        links: {
                            prev: pagination.page > 1 ? `/api/v1/friends?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : null,
                            next: pagination.page < totalPages ? `/api/v1/friends?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : null,
                        },
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' + error });
        }
    }

    async getfriendById(req, res) {
        const { id } = req.params;
        try {
            const friend = await friendService.getfriendById(id);
            if (friend.length === 0) {
                res.status(404).json({ message: 'friends not found' });
            } else {
                res.status(200).json(friend);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createfriend(req, res) {
        const friendData = req.body;
        try {
            const createdfriend = await friendService.createfriend(friendData);
            res.status(201).json(createdfriend);
        } catch (error) {
            res.status(400).json({ message: 'Error creating friend' });
        }
    }

    async updatefriend(req, res) {
        const { id } = req.params;
        const friendData = req.body;
        try {
            const updatedfriend = await friendService.updatefriend(id, friendData);
            res.status(200).json(updatedfriend);
        } catch (error) {
            res.status(404).json({ message: 'friend not found' });
        }
    }

    async deletefriend(req, res) {
        const { id } = req.params;
        try {
            await friendService.deletefriend(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'friend not found' });
        }
    }

    async searchfriends(req, res) {
        const { page = 1, pageSize = 50 } = req.query;
        const { name, type, address, phone, opening_hours } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { name, type, address, phone, opening_hours };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { friends, totalCount, totalPages } = await friendService.searchfriends(queryParams, pagination);

                if (friends.length === 0) {
                    res.status(404).json({ message: 'No friends found matching the search criteria' });
                } else {
                    res.status(200).json({
                        data: friends,
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

module.exports = new friendController();