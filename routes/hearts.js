const express = require('express');
const router = express.Router();
const Heart = require('../models/heart');
const Message =  require('../models/message');
const isAuthenticate = require('../middleware/isAuthenticate');
const isAdmin = require('../middleware/isAdmin');

router.put('/:id', isAuthenticate, (req, res) => {
    const user = req.body.userId;
    const message = req.params.id;
    console.log('user ', user)
    res.json({ done: 'ok'})

});

module.exports = router;