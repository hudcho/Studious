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
    const dmResult = await pool.query(
      `
    SELECT DISTINCT ON (
        LEAST(m.sender_id, m.recipient_id),
        GREATEST(m.sender_id, m.recipient_id)
    )
        CONCAT(LEAST(m.sender_id, m.recipient_id), '-', GREATEST(m.sender_id, m.recipient_id)) AS conversationid,
        'dm' AS type,
        u.id AS otherUserID,
        u.username AS name,
        m.content AS lastMessage,
        m.sent_at AS updatedAt
    FROM messages m
    JOIN users u
      ON u.id = CASE WHEN m.sender_id = $1 THEN m.recipient_id ELSE m.sender_id END
    WHERE (m.sender_id = $1 OR m.recipient_id = $1)
      AND m.circle_id IS NULL
    ORDER BY 
        LEAST(m.sender_id, m.recipient_id),
        GREATEST(m.sender_id, m.recipient_id),
        m.sent_at DESC
      `,
      [user_id]
    );


    // 2. Get all circles the user is a member of
    const circleResult = await pool.query(
        `
        SELECT
            c.id AS conversationID,
            'circle' AS type,
            c.name,
            NULL AS otherUserID,
            NULL AS lastMessage,
            NULL AS updatedAt
        FROM circles c
        JOIN circle_members cm
          ON c.id = cm.circle_id
        WHERE cm.user_id = $1
        `
        , [user_id]
    );

    // 3. Combine DMs and circles
    const conversations = [...dmResult.rows, ...circleResult.rows];

    conversations.sort((a, b) => {
        if (!a.updatedAt) return 1; // a is circle → goes after b
        if (!b.updatedAt) return -1; // b is circle → goes after a
        return new Date(b.updatedAt) - new Date(a.updatedAt); // sort DMs by latest
    });
    return conversations;

}

module.exports = {
    getConversations
}