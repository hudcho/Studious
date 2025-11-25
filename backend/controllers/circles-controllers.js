/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    The `circles-controller.js` is used to perform middle logic to be applied onto circles-db.js 
*/

const circlesDb = require('../database/circles-db');
const membersDb = require('../database/circle-members-db')
const usersDb = require('../database/users-db')

// create circle
async function createCircle(req, res) {
    const createdBy = req.user.id;
    const { name, members  } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Missing name field'});
    }
    if (!Array.isArray(members)) {
        return res.status(400).json({ error: "'members' must be an array of usernames" });
    }
    
    try {
        // Makes sure circle name doesnt already exist
        const preexistingCircle = await circlesDb.getCircleByName(name);
        if (preexistingCircle) {
            return res.status(400).json({ error: 'Circle name already taken'});
        } 

        // Create new circle and add owner to circle
        const newCircle = await circlesDb.createCircle(name, createdBy);
        await membersDb.createCircleMember(createdBy, newCircle.id)


        // Addes each member from members[] field into the circle
        const addedMembers = [];
        for (const username of members) {
            const user = await usersDb.getUserByUsername(username);
            if(!user) {
                console.log(`User '${username}' not found - skipping`);
                continue;
            }

            const existingMember = await membersDb.getByCircleAndUser(user.id, newCircle.id);
            if (!existingMember) {
                await membersDb.createCircleMember(user.id, newCircle.id);
                addedMembers.push(user);
            }
        }



        return res.status(201).json({ newCircle, members: addedMembers });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error when creating circle' }); 
    }
}

// Return circle information
async function getCircle(req, res) {
    const { circleID } = req.params;

    if(!circleID) {
        return res.status(400).json({ error: 'Missing ID' });
    }
    try {
        const circle = await circlesDb.getCircle(circleID);
        if (!circle){
            return res.status(404).json({ error: 'Circle not found' });
        }
        
        return res.status(200).json(circle);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Return all circles currently in the database
async function getAllCircles(req, res) {
    try {
        const circles = await circlesDb.getAllCircles();
        return res.status(200).json(circles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Update a users username or password
async function updateCircle(req, res) {
        const { circleID } = req.params;
        if(!circleID) {
            return res.status(400).json({ error: 'ID field missing'});
        }
    
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({ error: 'Name field missing'});
        }
    try {
        const circle= await circlesDb.getCircle(circleID);

        if(!circle) {
            return res.status(404).json({ error: 'Circle not found' });
        }

       // Checks if name is the same
        if(name == circle.name) {
            return res.status(400).json({ error: 'Nothing to update! '});
        }

        // Makes sure circle name doesnt already exist
        const preexistingCircle = await circlesDb.getCircleByName(name);
        if (preexistingCircle && preexistingCircle.id != circle.id) {
            return res.status(400).json({ error: 'Circle name already taken'});
        } 

        const updatedCircle = await circlesDb.updateCircleName(circleID, name);
        return res.status(200).json(updatedCircle);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Delete circle
async function deleteCircle(req, res) {
    const { circleID } = req.params;
    if(!circleID) {
        return res.status(400).json({ error: 'ID field missing'});
    }

    try {
        const existingCircle = await circlesDb.getCircle(circleID);
        if(!existingCircle) {
            return res.status(404).json({ error: 'Circle not found'});
        }

        const deletedCircle = await circlesDb.deleteCircle(circleID);
        return res.status(200).json(deletedCircle)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
}


module.exports = {
    createCircle,
    getCircle, getAllCircles,
    updateCircle,
    deleteCircle
}
