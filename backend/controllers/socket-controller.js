const messagesController = require('./messages-controller');

function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
        
        socket.on('sendMessage', async (message) => {
            if (!message || !message.senderID || !message.content || (!message.recipientID && !message.circleID)) {
                return socket.emit('messageError', { error: 'Missing required fields' });
            }
            try {
                const fakeReq = {
                    user: { id: message.senderID },
                    body: {
                        content: message.content,
                        recipientID: message.recipientID,
                        circleID: message.circleID
                    }
                };

                const fakeRes = {
                    status: (code) => ({
                        json: (data) => data
                    })
                };

                const savedMessage = await messagesController.sendMessage(fakeReq, fakeRes);

                io.emit('recieveMessage', savedMessage);
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