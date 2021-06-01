const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const routes = require('./routes');

const cookieParser = require("cookie-parser");
const config = require('./config/index');
const mongoose = require('./config/mongoose');

const app = express();

mongoose();
app.use(cors({
    origin: ['http://localhost:3000', '.'],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// move it to diff file
const chatService = require('./services/chatService');
const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: ['http://localhost:3000'] },
});

var users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connect', async (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

app.use('/', routes);

server.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))