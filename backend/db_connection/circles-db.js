/* 
AUTHOR: Hudson Cho
CREATED: 11.06.2025
UPDATED: 11.06.2025
DESCRIPTION:
    The `circles-db.js` file is used to query the database about information regarding the circles table.
*/

const pool = require ('./pool.js');

// Creates a circle by adding entry to database
async function createCircle(name, created_by) {
    const result = await pool.query(
        'INSERT INTO circles (name, created_by) VALUES ($1, $2) RETURNING *',
        [name, created_by]
    );
    return result.rows[0];
}

// Retreives circle name by ID
async function getCircleName(id) {
    const result = await pool.query(
        'SELECT name FROM circles WHERE id=$1',
        [id]
    );
    return result.rows[0];
}

// Retreives circle owner by ID
async function getCircleOwner(id) {
    const result = await pool.query(
        'SELECT created_by FROM circles WHERE id=$1',
        [id]
    );
    return result.rows[0];
}

// Updates circle name by ID
async function updateCircleName(id, name) {
    const result = await pool.query(
        'UPDATE circles SET name=$2 WHERE id=$1 RETURNING *',
        [id, name]
    );
    return result.rows[0];
}

// Deletes circle from database by ID
async function deleteCircle(id) {
    const result = await pool.query(
        'DELETE FROM circles WHERE id=$1 RETURNING *',
        [id]
    );
    return result.rows[0]
}
    

module.exports = {
    createCircle,
    getCircleName, getCircleOwner,
    updateCircleName,
    deleteCircle
}

