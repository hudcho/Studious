const messagesController = require('../database/messages-db');

function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
        
        socket.on('sendMessage', async (message) => {
            if (!message || !message.senderID || !message.content || (!message.recipientID && !message.circleID)) {
                return socket.emit('messageError', { error: 'Missing required fields' });
            }
            try {
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

}

module.exports = setupSocket;