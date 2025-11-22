/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:
    Handles business logic for messagess-db.js, processing requests from routes to
    send messages to a user or circle and get messages sent between two users
    or get messages sent to a circle
*/
/*
                    ADD LATER:
    - Pagination? 
    - Verify sender and recipient not the same,
    - Verify sender, recipient, circle all exist before sending
*/


const messagesDb = require ('../database/messages-db');

// Creates a message and validates its properties
async function sendMessage(req, res) {
    const senderID = req.user.id;
    const { content, recipientID, circleID } = req.body;

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

// Return all messages between two users
async function getDirectMessages(req, res) {
    const senderID = req.user.id;
    const { recipientID } = req.query;
    if(!senderID || !recipientID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    if(isNaN(senderID) || isNaN(recipientID)) {
        return res.status(400).json({ error: 'Invalid data type for senderID or recipientID'});
    }

    try {
        const messages = await messagesDb.getDirectMessages(senderID, recipientID);
        return res.status(200).json(messages);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}
    
// Return all messages sent to a circle
async function getCircleMessages(req, res) {
    const circleID = req.params.circleID;
    if(!circleID) {
        return res.status(400).json({ error: 'Missing required circleID field'});
    }
    if(isNaN(circleID)) {
        return res.status(400).json({ error: 'Invalid data type for circleID'});
    }

    try {
        const messages = await messagesDb.getCircleMessages(circleID)
        return res.status(200).json(messages);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
} 

module.exports = {
    sendMessage,
    getDirectMessages, getCircleMessages
}
