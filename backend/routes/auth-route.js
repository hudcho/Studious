/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    The `users-routes.js` file is used for routing HTTP requests to the appropriate
    handler located in users-controllers.js 
*/

const express = require('express');
const router = express.Router();
const authController  = require('../controllers/auth-controller');

// Used for login 
router.post('/login', authController.login);

module.exports = router;
