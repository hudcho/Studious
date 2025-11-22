/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    The `auth-controller.js` file is used for authenticating a user using  
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersDb = require('../database/users-db');
const { JWT_SECRET } = require('../config/env');

async function login(req, res) {
    const { username, password } = req.body;
    const user = await usersDb.getUserByUsername(username);

    // Checks user exists in database
    if (!user){
        return res.status(400).json({ error: 'Incorrect username or password' });
    }

    // Checks entered password against password in database
    const correctPassword = await bcrypt.compare(password, user.password_hash);
    if (!correctPassword) {
        return res.status(400).json({ error: 'Incorrect username or password' });
    }

    // Create json web token
    const token = jwt.sign(
        { id:user.id, username:user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
}

module.exports = { login };