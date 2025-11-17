/* 
AUTHOR: Hudson Cho
CREATED: 11.06.2025
UPDATED: 11.06.2025
DESCRIPTION:
    The `users-db.js` file is used to query the database about information regarding the users table.
*/

const pool = require ('./pool.js');

// Creates user account by adding it into the database
async function createUser(username, passwordHash) {
    const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
         [username, passwordHash]
        );
    return result.rows[0];
}

// Retreives private information by ID, BACKEND USE ONLY: SHOULD NOT BE RETURNED TO server.js
async function getPrivateUser(id) {
    const result = await pool.query(
        'SELECT * FROM users WHERE id=$1',
        [id]
    );
    return result.rows[0];
}

// Retreives public information by ID 
async function getPublicUser(id) {
    const result = await pool.query(
        'SELECT id, username FROM users WHERE id=$1',
        [id]
    )
}

// Retreives the password hash for a user specified by their ID
// Used for authentication
async function getPasswordHash(id) {
    const result = await pool.query(
        'SELECT password_hash FROM users WHERE id=$1',
        [id]
    );
    return result.rows[0];
}

// Updates the username of an user specified by their ID
async function updateUsername(id, username) {
    const result = await pool.query(
        'UPDATE users SET username = $2 WHERE id = $1 RETURNING *',
        [id, username]
    );    
    return result.rows[0];
}

// Updates the password of a user specified by their ID
// Password should first be hashed in users-controller.js
async function updatePassword(id, password_hash) {
    const result = await pool.query(
        'UPDATE users SET password_hash = $2 WHERE id = $1 RETURNING *',
        [id, password_hash]
    );
    return result.rows[0];
}

// Delets an entry for a user specified by their ID
async function deleteUser(id) {
    const result = await pool.query(
        'DELETE FROM users WHERE id=$1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = { 
    createUser,
    getPrivateUser, getPublicUser, getPasswordHash, 
    updateUsername, updatePassword,
    deleteUser
};