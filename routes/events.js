const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const isAuthenticate = require('../middleware/isAuthenticate');

function createEvent(req) {
    return new Event({
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        title: req.body.title,
        description: req.body.description
    });
}

router.post('/', isAuthenticate, (req, res) => {
    if (req.decoded.isAdmin) {
        const event = createEvent(req);
        event.save((err, doc) => {
            if (err) return res.json(err);
            console.log('event ', doc);
            res.json({
                message: "event save",
                status: 200
            });
        })
    } else {
        res.json({
            message: "Il faut être admin pour cette opération",
            status: 401
        })
    }
});

router.get('/', isAuthenticate, (req, res) => {
    res.send({ message: "OK" });
});

module.exports = router;