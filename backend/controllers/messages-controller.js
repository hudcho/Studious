/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const messagesDb = require ('../db_connectors/messages-db');

// Creates a message and validates its properties
async function sendMessage(req, res) {
    const { content, senderID, recipientID, circleID } = req.body;

    if(!senderID || (!recipientID && !circleID)) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }

    //enforces content requirements
    if(typeof content !== 'string') { 
        return res.status(400).json({ error: 'Invalid content type'});
    }
    if(!content || content.length==0) {
        return res.status(400).json({ error: 'Message cannot be empty'});
    }
    if(content.length > 1000) {
        return res.status(400).json({ error: 'Message too long'});
    }

    if((recipientID && circleID) || (!recipientID && !circleID)) {
        return res.status(400).json({ error: 'Must either be a direct or circle message'});
    }

    try {
        const message = await messagesDb.createMessage(content,senderID, recipientID, circleID);
        return res.status(201).json(message);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}
    
