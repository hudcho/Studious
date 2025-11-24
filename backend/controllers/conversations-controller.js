/* 
AUTHOR: Hudson Cho
CREATED: 11.23.2025
UPDATED: 11.23.2025
DESCRIPTION:
*/

const controllerDb = require ('../database/conversations-db');

async function getConversations(req, res) {
    const userID = req.user.id;

    try {
        const conversations = await controllerDb.getConversations(userID);
        return res.status(200).json(conversations);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

module.exports = {
    getConversations
}