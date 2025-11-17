// Remove sensitive data from a user object
function sanitizeUser(user){
    if(!user){
        return null;
    }   
    const { id, username } = user;
    return { id, username }; 
}

module.exports = sanitizeUser;