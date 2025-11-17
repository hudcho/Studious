/* 
AUTHOR: Hudson Cho
CREATED: 11.015.2025
UPDATED: 11.015.2025
DESCRIPTION:
    The `messages-db.js` file is used to query the database about information regarding the messages table.

*/

const pool = require ('./pool.js');

// Creates a new message to be added to the database
// Either recipient_id or circle_id should be null, both should not have values
async function createMessage(content, sender_id, recipient_id=null, circle_id=null) {
    if((recipient_id && circle_id) || (!recipient_id && !circle_id)) {
        throw new Error("Must provide EITHER sender_id or circle_id");
    }
    const result = await pool.query(
        'INSERT INTO messages (content, sender_id, recipient_id, circle_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [content, sender_id, recipient_id, circle_id]
    );
    return result.rows[0];
}

// Retreives message data by ID
async function getMessage(id) {
    const result = await pool.query(
        'SELECT * FROM messages WHERE id=$1',
        [id]
    );
    return result.rows[0];
}

// Deletes message from database by ID   
async function deleteMessage(id) {
    const result = await pool.query(
        'DELETE FROM messages WHERE id=$1 RETURNING *',
        [id]
    );
    return result.rows[0]
}
    

module.exports = {
    createMessage,
    getMessage,
    deleteMessage
}