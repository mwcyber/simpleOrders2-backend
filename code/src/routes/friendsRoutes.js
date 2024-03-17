// src/routes/friendsRoutes.js
const express = require('express');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.get('/', friendController.getAllFriends);
router.get('/:id', friendController.getFriendById);
router.post('/', friendController.createFriend);
router.put('/:id', friendController.updateFriend);
router.delete('/:id', friendController.deleteFriend);
router.post('/search', friendController.searchFriends);

module.exports = router;