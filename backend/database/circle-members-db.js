/*
AUTHOR: Hudson Cho
CREATED: 11.16.2025
UPDATED: 11.16.2025
DESCRIPTION:
    The `circle-members-db.js` file is used to query the database about information regarding the member of a particular circle
*/

const pool = require('./pool.js');

// Adds a member to a circle by linking the circle_id and user_id
async function createCircleMember(user_id, circle_id) {
    const result = await pool.query(
        'INSERT INTO circle_members (circle_id, user_id) VALUES ($1, $2) RETURNING *',
        [circle_id, user_id]
    );
    return result.rows[0];
}

// Returns the members of a specific circle
async function getCircleMembers(circle_id) {
    const result = await pool.query(
        'SELECT user_id FROM circle_members WHERE circle_id=$1',
        [circle_id]
    );
    return result.rows[0];
}

// Returns the circles a user is a member of
async function getUsersCircles(user_id) {
    const result = await pool.query(
        'SELECT circle_id FROM circle_members WHERE user_id=$1',
        [user_id]
    )
    return result.rows[0];
}

// Return the row containing matching user_id and circle_id
async function getByCircleAndUser(user_id, circle_id) {
    const result = await pool.query(
        'SELECT * FROM circle_members WHERE user_id=$1 AND circle_id=$2',
        [user_id, circle_id]
    )
    return result.rows[0];
}

// Removes a member from a circle by removing the connection between circle_id and user_id from the database
async function deleteCircleMember(user_id, circle_id) {
    const result = await pool.query(
        'DELETE FROM circle_members WHERE user_id=$1 AND circle_id=$2 RETURNING *',
        [user_id, circle_id]
    );
    return result.rows[0]
}

module.exports={
    createCircleMember,
    getCircleMembers, getByCircleAndUser, getUsersCircles,
    deleteCircleMember
}