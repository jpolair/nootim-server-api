const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {
    res.send({ message: "OK"});
});

module.exports = router;