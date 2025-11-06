//File contains the needed CRUD operations to interact with the database. 
const pool = require ('./db.js');

// Creates user account by adding it into the database
async function createUser(username, passwordHash) {
    const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
         [username, passwordHash]
        );
    print(result.rows[0]);
    return result.rows[0];
}

// Retreieve entry for user based on ID
async function getUserById(id) {
    const result = await pool.query(
        'SELECT * FROM users WHERE id=$1',
        [id]
    );
    print(result.rows[0]);
    return result.rows[0];
}

//updateUserName

//updateUserPassword_hash

//deleteUser

module.exports(createUser, getUserById);

