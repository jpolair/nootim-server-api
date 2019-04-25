const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/nootim', {useCreateIndex: true,useNewUrlParser: true });

/* ROUTES */
const authenticate = require('./routes/authenticate');
const users = require('./routes/users');
const events = require('./routes/events');
const clubs = require('./routes/clubs');
const messages = require('./routes/messages');
const payments = require('./routes/payments');
const comments = require('./routes/comments');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/authenticate', authenticate);
app.use('/api/users', users);
app.use('/api/clubs', clubs);
app.use('/api/events', events);
app.use('/api/messages', messages);
app.use('/api/payments', payments);
app.use('/api/comments', comments);

app.get('', (req, res) => {
    res.json({ 'hello': 'world'});
});

app.listen(3000, () => {
    console.log('nootim-api-server écoute le port 3000');
});