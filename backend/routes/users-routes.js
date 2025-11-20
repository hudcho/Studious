const express = require('express');
const router = express.Router();
const usersController  = require('./controllers/users-controller.js');

router.post('/', usersController.createUser);               // POST /users

router.patch('/:id', usersController.updateUser)            // PATCH /users/:id

module.exports = router;