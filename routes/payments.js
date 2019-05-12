const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router.post('/', (req, res) => {
    res.send({ message: "post payment"});
});

router.get('/', (req, res) => {
    res.send({ message: "get payment"});
});

module.exports = router;