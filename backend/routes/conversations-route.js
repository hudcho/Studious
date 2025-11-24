/* 
AUTHOR: Hudson Cho
CREATED: 11.23.2025
UPDATED: 11.23.2025
DESCRIPTION:

*/

const express = require('express');
const router = express.Router();
const conversationsController  = require('../controllers/conversations-controller');
const authenticateToken = require('../middleware/auth');

// Route GET requests to retrieve all circles a user is a member of
router.get('/', authenticateToken, conversationsController.getConversations);

module.exports = router;
