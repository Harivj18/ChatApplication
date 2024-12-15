const socketio = require('socket.io');
const messages = require('./controllers/messageController')

const socketConnection = (server) => {
    const io = socketio(server, {
        cors: {
            origin: ["http://localhost:3000","http://localhost:3001"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connect', (socket) => {
        console.log('Socket Connected to Server Successfully', socket.id);

        socket.on('message', (message) => {
            console.log('User Message', message);
            messages.sentMessage(message)
            socket.to(message.room).emit("response", message);
        });

        socket.on('join_room', (roomId) => {
            console.log('Room Joined', roomId);
            socket.join(roomId);
        });

        socket.on('leave_room', (roomId) => {
            console.log('leave_room', roomId);
            socket.leave(roomId);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected from the server', socket.id);
        });
    });
};

module.exports = socketConnection;
