const { Pool } = require('pg');
const pool = new Pool({
    user: 'studious_user',
    password: 'password',
    host: 'localhost',
    database: 'studious_db',
    port: 5432,
});

async function createUser(username, passwordHash) {
    const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
         [username, passwordHash]
        );
    print(result.rows[0]);
    return result.rows[0];
}





createUser("hudson", "pw1");