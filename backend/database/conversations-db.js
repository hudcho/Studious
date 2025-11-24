/* 
AUTHOR: Hudson Cho
CREATED: 11.23.2025
UPDATED: 11.23.2025
DESCRIPTION:
    Conversations database connector to retreieve information about a
    users conversations that have been created
*/

const pool = require ('./pool.js');

// Returns all conversations that user_id has
async function getConversations(user_id) {
    const result = await pool.query(
      `
      SELECT u.id, u.username
      FROM (
          SELECT DISTINCT
              CASE 
                  WHEN sender_id = $1 THEN recipient_id
                  ELSE sender_id
              END AS other_user_id
          FROM messages
          WHERE sender_id = $1 OR recipient_id = $1
      ) AS convos
      JOIN users u ON convos.other_user_id = u.id;
      `,
      [user_id]
    );
    return result.rows[0];
}

module.exports = {
    getConversations
}