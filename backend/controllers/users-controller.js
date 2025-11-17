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
const sanitizeUser = require('./util/sanitizeUsers.js');


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
        
        const safeUser = sanitizeUser(newUser)
        return res.status(201).json(safeUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error when creating user' }); 
    }
}

// Return public information about a user
async function getUserById(req, res) {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ error: 'ID field missing'});
    }

    try {
        const user = await usersDb.getPrivateUser(id);

        if(!user){
            return res.status(404).json({ error: 'User not found'});
        }

        safeUser = sanitizeUser(user);
        return res.status(200).json(safeUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}



module.exports={
    createUser,
    getUserById,
    w
}