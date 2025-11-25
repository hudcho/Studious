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
    
    const message = result.rows[0];

    const userResult = await pool.query(
        'SELECT username FROM users WHERE id = $1',
        [message.sender_id]
    );

    message.sender_username = userResult.rows[0].username;

    return message;
}

// Retreives all messages sent between sender_id and recipient_id 
async function getDirectMessages(sender_id, recipient_id) {
    const result = await pool.query(
        `
        SELECT 
            m.*, 
            u.username AS sender_username
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE (m.sender_id=$1 AND m.recipient_id=$2) OR (m.sender_id=$2 AND m.recipient_id=$1)
        ORDER BY m.sent_at ASC
        `,
        [sender_id, recipient_id]
    );
    return result.rows;
}

// Retreives all messages sent to circle_id
async function getCircleMessages(circle_id) {
    const result = await pool.query(
        `
        SELECT 
            m.*,
            u.username AS sender_username
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE m.circle_id=$1
        ORDER BY m.sent_at ASC
        `,
        [circle_id]
    )
    return result.rows;
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
    getDirectMessages, getCircleMessages,
    deleteMessage
}