/* 
AUTHOR: Hudson Cho
CREATED: 11.21.2025
UPDATED: 11.21.2025
DESCRIPTION:

*/

const friendshipsDb = require('../db_connectors/friends-db');

// Add friend to users friendlist
async function addFriend(req, res) {
    const userID = req.user.id
    const { newFriendID } = req.body;
    if(!userID || !newFriendID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    if(isNaN(userID || isNaN(newFriendID))) {
        return res.status(400).json({ error: 'Invalid data type for userID or newFriendID'});
    }

    if(userID == newFriendID){
        return res.status(400).json({ error: 'userID and friendID cannot be the same'});
    }
    
    try {
       const isFriends = await friendshipsDb.getFriendship(userID, newFriendID);
       if(isFriends){
            return res.status(400).json({ error: 'Users are already friends'});
       }

       const friendship = await friendshipsDb.createFriend(userID, newFriendID);
       return res.status(201).json(friendship)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

// Returns all friends of a user
async function getUserFriends(req, res) {
    const { userID } = req.params;
    if(!userID) {
        return res.status(400).json({ error: 'Missing userID field'});
    }
    if(isNaN(userID)) {
        return res.status(400).json({ error: 'Invalid data type for userID'});   
    }

    try {
        const friends = await friendshipsDb.getUserFriends(userID);
        return res.status(200).json(friends);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

// Return a friendship between two users
async function getFriendship(req, res) {
    const { userID, otherUserID } = req.query;
    if(!userID || !otherUserID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    if(isNaN(userID || isNaN(otherUserID))) {
        return res.status(400).json({ error: 'Invalid data type for userID or otherUserID'});
    }
    if(userID == otherUserID) {
        return res.status(400).json({ error: 'userID and otherUserID cannot be the same'});
    }

    try {
        const friendship = await friendshipsDb.getFriendship(userID, otherUserID);
        if(!friendship) {
            return res.status(404).json({ error: 'Users are not friends'});
        }
        return res.status(200).json(friendship)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}

// Delete a friendship between two users
async function removeFriend(req, res) {
    const { userID, friendID } = req.params
    if(!userID || !friendID) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    if(isNaN(userID || isNaN(friendID))) {
        return res.status(400).json({ error: 'Invalid data type for userID or friendID'});
    }
    if(userID == friendID){
        return res.status(400).json({ error: 'userID and friendID cannot be the same'});
    }

    try {
        const deleteFriendship = await friendshipsDb.deleteFriendship(userID, friendID);
        return res.status(204).send();
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
 
}

   


module.exports = {
    addFriend,
    getUserFriends,
    getFriendship,
    removeFriend
}
