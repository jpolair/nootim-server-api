const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nootim';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true });

/* ROUTES */
const authenticate = require('./routes/authenticate');
const users = require('./routes/users');
const events = require('./routes/events');
const clubs = require('./routes/clubs');
const messages = require('./routes/messages');
const payments = require('./routes/payments');
const comments = require('./routes/comments');
const hearts = require('./routes/hearts');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/authenticate', authenticate);
app.use('/api/users', users);
app.use('/api/clubs', clubs);
app.use('/api/events', events);
app.use('/api/messages', messages);
app.use('/api/payments', payments);
app.use('/api/comments', comments);
app.use('/api/hearts', hearts);

app.get('', (req, res) => {
    res.json({ message: 'Ici viendra ma SPA....'});
});

const server = app.listen(PORT, () => {
    console.log(`nootim-api-server écoute le port ${PORT}`);
});

const io = socket(server);

io.on('connection', (socket) =>  {
    console.log('connection socket établie', socket.id);
    socket.on('messageCreated', (data) => {
        console.log('message create ', data);
        io.sockets.emit('messageCreated', data);
    });
    socket.on('messageUpdated', (data) => {
        console.log('message updated ', data);
        io.sockets.emit('messageUpdated', data);
    });
    socket.on('userCreate', (data) => {
        console.log('user create ', data);
    });
    socket.on('commentCreate', (data) => {
        console.log('comment create ', data);
    });
    socket.on('eventCreate', (data) => {
        console.log('data in test ', data);
    });
});

