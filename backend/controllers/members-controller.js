/*
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:
    Handles business logic for members-db.js, processing requests from routes
    and interacting with the database or other services as needed.
*/

const { json } = require('express');
const membersDb = require('../db_connectors/circle-members-db');

// Adds a member to a circle
async function addMember(req, res) {
    const { userID, circleID } = req.body;
    if(!userID || !circleID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    try {
        const existingMember = await membersDb.getByCircleAndUser(userID,circleID);
        if(existingMember) {
            return res.status(400).json({ error: 'User is already a member'});
        }

        const newMember = await membersDb.createCircleMember(userID, circleID);
        return res.status(201).json(newMember);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

module.exports = {
    addMember,
}

