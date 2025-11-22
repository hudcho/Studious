/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const express = require('express');
const router = express.Router();
const membersController  = require('../controllers/members-controller');
const authenticateToken = require('../middleware/auth');

// Route POST requests to addMember
router.post('/', authenticateToken, membersController.addMember);

// Route GET requests to retrieve all circles a user is a member of
router.get('/my-circles', authenticateToken, membersController.getAllCircles);

// Route GET requests to retrieve all members in a circle
router.get('/:circleID/members', authenticateToken, membersController.getAllMembers);

// Route DELETE requests to delete a member from a user
router.delete('/:circleID/members/:userID', authenticateToken, membersController.removeMember);

