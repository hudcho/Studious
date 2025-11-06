const { Pool } = require('pg');
const pool = new Pool({
    user: 'studious_user',
    password: 'password',
    host: 'localhost',
    database: 'studious_db',
    port: 5432,
});

module.exports = pool;

