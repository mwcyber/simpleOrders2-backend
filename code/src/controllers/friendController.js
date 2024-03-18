// src/controllers/friendController.js
const friendService = require('../services/friendService');

class friendController {
    async getAllFriends(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };

        try {
            const { friends, totalCount, totalPages } = await friendService.getAllfriends(userId, pagination);

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

    async getFriendById(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            const friend = await friendService.getFriendById(userId, id);
            if (friend.length === 0) {
                res.status(404).json({ message: 'friends not found' });
            } else {
                res.status(200).json(friend);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createFriend(req, res) {
        const userId = req.user.userId;
        const friendData = req.body;
        try {
            const createdFriend = await friendService.createFriend(userId, friendData);
            res.status(201).json(createdFriend);
        } catch (error) {
            res.status(400).json({ message: 'Error creating friend' + error });
        }
    }

    async updateFriend(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        const friendData = req.body;
        try {
            const updatedFriend = await friendService.updateFriend(userId, id, friendData);
            res.status(200).json(updatedFriend);
        } catch (error) {
            res.status(404).json({ message: 'friend not found' });
        }
    }

    async deleteFriend(req, res) {
        const userId = req.user.userId;
        const { id } = req.params;
        try {
            await friendService.deleteFriend(userId, id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'friend not found' });
        }
    }

    async searchFriends(req, res) {
        const userId = req.user.userId;
        const { page = 1, pageSize = 50 } = req.query;
        const { nickname } = req.body;

        const pagination = { page: parseInt(page), pageSize: parseInt(pageSize) };
        const queryParams = { nickname };

        // Verifica che almeno un parametro di ricerca sia presente
        if (Object.values(queryParams).some(value => value !== undefined)) {
            try {
                const { friends, totalCount, totalPages } = await friendService.searchFriends(userId, queryParams, pagination);

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