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
    origin: ['http://localhost:3000'], credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: ['http://localhost:3000'] },
});

io.on('connect', (client) => {
    client.on('join', ({ name, room }, errCallback) => {
        console.log('user joined');
        console.log(name, room);
    })

    client.on('leave', () => {
        console.log('user left');
    })

    client.on('message', ({ message }) => {
        console.log('server ', message);
    })
});

app.use('/', routes);

server.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))