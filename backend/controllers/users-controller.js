/* 
AUTHOR: Hudson Cho
CREATED: 11.16.2025
UPDATED: 11.16.2025
DESCRIPTION:
    The `users-controller.js` file is used for sanitizing data, performing input validation, and other 
    logic tasks that are not handled by server.js or db_connections
*/

const usersDb = require('./db_connections');
const bcrypt = require('bcrypt');

// Remove sensitive data from a user object
function sanitizeUser(user){
    if(!user){
        return null;
    }   
    const { id, username } = user;
    return { id, username}; 
}

// Creates a user
async function createUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing one or more required fields '});
    }
    

    try {
        
        // Hash password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await usersDb.createUser(username, hashedPassword);
        return res.status(201).json(sanitizeUser(newUser));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error when creating user' }); 
    }
}