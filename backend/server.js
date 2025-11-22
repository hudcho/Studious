const express = require('express');
const usersRoute = require('./routes/users-route');
const circlesRoute = require('./routes/circles-route');
const messagesRoute = require('./routes/messages-route');
const friendsRoute = require('./routes/friends-route');
const membersRoute = require('./routes/members-route');
const authRoute = require('./routes/auth-route');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Route HTTP requests to /users to users-route
app.use('/users', usersRoute);

// Route HTTP requests to /circles to circles-route
app.use('/circles', circlesRoute)

// Route HTTP requests to /messages to messages-route
app.use('/messages', messagesRoute)

// Route HTTP requests to /friends to friends-route
app.use('/friends', friendsRoute)

// Route HTTP requests to /members to members-route
app.use('/members', membersRoute)

// Route HTTP requests to /auth to auth-route
app.use('/auth', authRoute)




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});