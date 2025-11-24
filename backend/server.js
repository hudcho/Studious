const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const usersRoute = require('./routes/users-route');
const circlesRoute = require('./routes/circles-route');
const messagesRoute = require('./routes/messages-route');
const friendsRoute = require('./routes/friends-route');
const membersRoute = require('./routes/members-route');
const authRoute = require('./routes/auth-route');
const convRoute = require('./routes/conversations-route');
const cors = require('cors');

const { setupSocket } = require('./controllers/socket-controller');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST' ]
    }
});

const messagesDb = require('./database/messages-db');
const { getConversations } = require('./database/conversations-db');

//function setupSocket(io) {
io.on('connection', (socket) => {
    console.log("User connected: ", socket.id);
    
    socket.on('sendMessage', async (message) => {
        console.log("message recieived: ", message);
        if (!message || !message.senderID || !message.content || (!message.recipientID && !message.circleID)) {
            return socket.emit('messageError', { error: 'Missing required fields' });
        }
        try {
            console.log("message recieived: ", message);
            const savedMessage = await messagesDb.createMessage(
                message.content,
                message.senderID,
                message.recipientID || null,
                message.circleID || null
            );
            io.emit('receiveMessage', savedMessage);
        }
        catch (err) {
            console.error(err);
            socket.emit('messageError', { error: err.message });
        } 
    });
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });

});

//}

//setupSocket;




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

// Route HTTP requests to /conversations to conversations-route
app.use('/conversations', convRoute);



server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});