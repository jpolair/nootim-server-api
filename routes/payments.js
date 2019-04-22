const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {
    res.send({ message: "OK"});
});

module.exports = router;