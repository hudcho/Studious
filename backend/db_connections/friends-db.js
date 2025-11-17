/*
AUTHOR: Hudson Cho
CREATED: 11.16.2025
UPDATED: 11.16.2025
DESCRIPTION:
    The `friends-db.js` file is used to query the database about information regarding friends connections  
*/

const pool = require('./pool.js');

// Creates a friend for a user 
async function createFriend(user_id, friend_id) {
    const result = await pool.query(
        'INSERT INTO friends (user_id, friend_id) VALUES ($1, $2) RETURNING *',
        [user_id, friend_id]
    );
    return result.rows[0];
}

// Returns friends of a specific user
async function getUserFriends(user_id) {
    const result = await pool.query(
        'SELECT * FROM friends WHERE user_id=$1',
        [user_id]
    );
    return result.rows[0];
}

// Deletes a friend from the database
async function deleteFriend(id) {
    const result = await pool.query(
        'DELETE FROM friends WHERE id=$1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = {
    createFriend,
    getUserFriends,
    deleteFriend
}