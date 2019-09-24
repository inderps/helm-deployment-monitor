const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const { getListOfCharts } = require('./helm');

const app = express();

app.use(express.static('dist'));

app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist/')));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('getListOfCharts', () => {
    socket.emit('getListOfChartsResponse', getListOfCharts());
  });
});

server.listen(8080);
