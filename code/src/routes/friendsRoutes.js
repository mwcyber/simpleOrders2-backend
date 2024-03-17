// src/routes/friendsRoutes.js
const express = require('express');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.get('/', friendController.getAllfriends);
router.get('/:id', friendController.getfriendById);
router.post('/', friendController.createfriend);
router.put('/:id', friendController.updatefriend);
router.delete('/:id', friendController.deletefriend);
router.post('/search', friendController.searchfriends);

module.exports = router;