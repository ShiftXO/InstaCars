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
    origin: ['http://localhost:3000'],
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

io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;

    // if (!userId) {
    //     return next(new Error("invalid username"));
    // }
    socket.userId = userId;
    next();
});

var connectedUsers = {};

io.on('connect', async (client) => {
    client.onAny((event, ...args) => {
        console.log(event, args);
    });

    /*Register connected user*/
    client.on('register', function (username) {
        client.username = username;
        connectedUsers[username] = client;
    });

    const users = []
    const dbIsers = await chatService.getUsers();
    for (let [id, client] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: client.username,
        });
    }
    client.emit("users", users);

    // notify existing users
    client.broadcast.emit("user connected", {
        userID: client.id,
        username: client.username,
    });

    client.on("private message", ({ content, to }) => {
        client.to(to).emit("private message", {
            content,
            from: client.id,
        });
    });
    // client.on('join', async ({ name, room }, msg) => {
    //     console.log('user joined');
    //     console.log(name, room);
    //     msgTo = room;
    //     // check for chat
    //     let messages = await chatService.getMessages(name, room);
    //     // get chat msgs
    //     msg(messages);
    // })

    // client.on('leave', () => {
    //     console.log('user left');
    // })

    // client.on('message', ({ message }) => {
    //     console.log('server ', message);

    //     client.emit('message', { message });
    // })
});

app.use('/', routes);

server.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))