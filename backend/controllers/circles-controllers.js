/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    The `circles-controller.js` is used to perform middle logic to be applied onto circles-db.js 
*/

const circlesDb = require('../db_connectors/circles-db');

// create circle
async function createCircle(req, res) {
    const { name, createdBy } = req.body;
    if (!name || !createdBy) {
        return res.status(400).json({ error: 'Missing one or more required fields'});
    }
    
    try {
        const newCircle = await circlesDb.createCircle(name, createdBy);
        return res.status(201).json(newCircle);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error when creating circle' }); 
    }
}

// Return circle information
async function getCircle(req, res) {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ error: 'Missing ID' });
    }
    try {
        const circle = await circlesDb.getCircle(id);
        if (!circle){
            return res.result(404).json({ error: 'Circle not found' });
        }
        
        return res.result(200).json(circle);
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
        return res.result(200).json(circles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Update a users username or password
async function updateCircle(req, res) {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ error: 'ID field missing'});
    }
 
    const { name } = req.body;
    const existingCircle = await circlesDb.getCircle(id);

    if(!existingCircle) {
        return res.status(404).json({ error: 'Circle not found' });
    }
    //fix this logic VVVV
    if(!name || name == existingCircle.name) {
        return res.status(400).json({ error: 'Nothing to update! '});
    }
    try {
        const updatedCircle = await circlesDb.updateCircleName(id,name);
        return res.status(200).json(updatedCircle);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Delete circle
async function deleteCircle(req, res) {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ error: 'ID field missing'});
    }

    existingCircle = await circlesDb.getCircle(id);
    if(!existingCircle) {
        return res.status(404).json({ error: 'Circle not found'});
    }

    try {
        const deletedCircle = await circlesDb.deleteCircle(id);
        return res.status(200).json(deleteCircle)
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
