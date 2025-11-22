/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages-controller');
const authenticateToken = require('../middleware/auth');

// Route POST requests to sendMessage()
router.post('/', authenticateToken, messagesController.sendMessage);

// Route GET for retrieving direct messages between two users 
router.get('/', authenticateToken, messagesController.getDirectMessages);

// Route GET for retrieving messages sent to a circle 
router.get('/:circleID', authenticateToken, messagesController.getCircleMessages);

module.exports = router;

