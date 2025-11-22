/*
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:
    Handles business logic for members-db.js, processing requests from routes to add,
    remove, or query about a member in a circle
*/

/*
FIX LATER:
- Validate use is a member of a circle before adding member to circle
- Validate user is owner of circle before deleting member
*/

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

// Return all members of a circle
async function getAllMembers(req, res) {
    const { circleID } = req.params;
    if(!circleID) {
        return res.status(400).json({ error: 'Missing circleID field'});
    }
    try {
        const members = await membersDb.getCircleMembers(circleID);
        return res.status(200).json(members)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

// Returns circles that a user is a member of
async function getAllCircles(req, res) {
    const userID = req.user.id
    if(!userID) {
        return res.status(400).json({ error: 'Missing userID field'});
    }
    try {
        const circles = await membersDb.getUsersCircles(userID);
        return res.status(200).json(circles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }  
}

// Removes a member from a circle
async function removeMember(req, res) {
    const { userID, circleID } = req.params;
    if(!userID || !circleID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    try {
        const existingMember = await membersDb.getByCircleAndUser(userID,circleID);
        if(!existingMember) {
            return res.status(400).json({ error: 'User is not a member'});
        }

        const removedMember = await membersDb.deleteCircleMember(userID, circleID);
        return res.status(200).json(removedMember);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

module.exports = {
    addMember,
    getAllCircles, getAllMembers,
    removeMember
}
