const express = require('express');
const router = express.Router();
const Club = require('../models/club');
const isAuthenticate = require('../middleware/isAuthenticate');

router.post('/', isAuthenticate, (req, res) => {
    const club = new Club({
        clubName: req.body.clubName,
        members: req.body.members
    });
    club.save( (err, doc) => {
        if (err) return res.json(err);
        res.json({
            message: "club save",
            status: 200
        });
    })
});

router.get('/', isAuthenticate, (req, res) => {
    console.log('dec' ,req.decoded)
    Club.find({}, (err, docs) => {
        if (err) return res.json(err);
        const clubs = docs;
        res.send({ message: "OK", decoded: req.decoded, clubs: clubs});
    });
});

router.get('/:id', isAuthenticate, (req, res) => {
    Club.findById({_id: req.body._id}, (err, doc) => {
        if (err) return res.json(err);
        res.json({ message: "OK", club: doc});
    })
});

module.exports = router;