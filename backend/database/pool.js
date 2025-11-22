/* 
AUTHOR: Hudson Cho
CREATED: 11.05.2025
UPDATED: 11.06.2025
DESCRIPTION:
    The `pool.js` creates a pool object from the `pg` package that is able to connect to and communicate with our database.
    Rather than each help file (users-db.js, messages-db.js, etc.) each creating their own connection, which would be heavier
    and the database and result in more latency, we pass the one pool object to multiple other components for effieciency.  
*/

const { Pool } = require('pg');
const pool = new Pool({
    user: 'studious_user',
    password: 'password',
    host: 'localhost',
    database: 'studious_db',
    port: 5432,
});

module.exports = pool;