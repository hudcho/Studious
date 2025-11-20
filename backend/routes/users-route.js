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
const usersController  = require('../controllers/users-controller');

// POST /users
router.post('/', usersController.createUser);               

// PATCH /users/:id
router.patch('/:id', usersController.updateUser);            

// GET /users/:id
router.get('/:id', usersController.getUserById);

// DELETE /users/:id
router.delete('/:id', usersController.deleteUser);

module.exports = router;