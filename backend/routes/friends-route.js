/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends-controller');
const authenticateToken = require('../middleware/auth');

// Route POST requests to add friend
router.post('/', authenticateToken, friendsController.addFriend);

// Route GET for getting a users friends
router.get('/', authenticateToken, friendsController.getUserFriends);

// Route GET for retrieving specific friendship
router.get('/friendship', friendsController.getFriendship);

// Route DELETE
router.delete('/:friendID', authenticateToken, friendsController.removeFriend);

module.exports = router;
