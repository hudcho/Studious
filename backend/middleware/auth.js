const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Missing authentication token'});
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Authentication token is invalid or expired'});
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;