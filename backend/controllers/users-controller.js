/* 
AUTHOR: Hudson Cho
CREATED: 11.16.2025
UPDATED: 11.20.2025
DESCRIPTION:
    The `users-controller.js` file is used for sanitizing data, performing input validation, and other 
    logic tasks that are not handled by server.js or db_connections
*/

const usersDb = require('../database/users-db.js');
const bcrypt = require('bcrypt');
const sanitizeUser = require('../util/sanitizeUser.js');


// Create user
async function createUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    
    try {
        const existingUser = await usersDb.getUserByUsername(username);
        if(existingUser) {
            return res.status(400).json({ error: "Username taken"});
        }

        // hash password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await usersDb.createUser(username, hashedPassword);
        // return only public information
        const safeUser = sanitizeUser(newUser)
        return res.status(201).json(safeUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error when creating user' }); 
    }
}

// return public information about a user
async function getUserById(req, res) {
    const id = req.user.id;

    if(!id) {
        return res.status(400).json({ error: 'ID field missing'});
    }
    try {
        const user = await usersDb.getPrivateUser(id);

        if(!user){
            return res.status(404).json({ error: 'User not found'});
        }
        // return only public information
        const safeUser = sanitizeUser(user);
        return res.status(200).json(safeUser);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getUserByUsername(req, res) {
    const { username } = req.params;
    if(!username) {
        return res.status(400).json({ error: 'ID field missing'});
    }
    try {
        const user = await usersDb.getPrivateUserByUsername(username);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const safeUser = sanitizeUser(user);
        return res.status(500).json(safeUser);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Update a users username or password
async function updateUser(req, res) {
    const id = req.user.id;
    if(!id) {
        return res.status(400).json({ error: 'ID field missing'});
    }
 
    const { username, password } = req.body;
    const existingUser = await usersDb.getPrivateUser(id);

    if(!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    if(!username && !password) {
        return res.status(400).json({ error: 'Nothing to update! '});
    }
    try {
        if(username) {
            await usersDb.updateUsername(id, username);
        }
        if(password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await usersDb.updatePassword(id, hashedPassword);
        }

        const updatedUser = await usersDb.getPrivateUser(id);
        // return only public information
        const safeUser = sanitizeUser(updatedUser);
        return res.status(200).json(safeUser);

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    const existingUser = await usersDb.getPrivateUser(id);

    if (!existingUser) {
        return resizeTo.status(404).json({ error: 'User not found' });
    }
    try {
        const deletedUser = await usersDb.deleteUser(id);
        const safeUser = sanitizeUser(deletedUser);
        return res.status(200).json(safeUser);
    }
    catch (err) {
        console.error(err);
        return resizeTo.status(500).json({ error: 'Server error' });
    }
}

module.exports={
    createUser,
    getUserById,getUserByUsername,
    updateUser,
    deleteUser
}