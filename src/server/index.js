const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const { getControllers } = require('./kubectl');

const app = express();

app.use(express.static('dist'));

app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist/')));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('give-controllers', () => {
    socket.emit('take-controllers', getControllers());
  });
});

server.listen(8080);
