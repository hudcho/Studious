/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const express = require('express');
const router = express.Router();
const circlesController = require('../controllers/circles-controllers');
const authenticateToken = require('../middleware/auth');

// Route POST requests to createCircle()
router.post('/', authenticateToken, circlesController.createCircle);

// Route GET requests for retrieving all circles
router.get('/', circlesController.getAllCircles)

// Route GET for retrieving a circle 
router.get('/:circleID', authenticateToken, circlesController.getCircle); 

// Route PATCH requests for changing a circle name
router.patch('/:circleID', authenticateToken, circlesController.updateCircle);

// Route DELTE requests for deleteing a circle
router.delete('/:circleID', authenticateToken, circlesController.deleteCircle);

module.exports = router;

