const express = require('express');
const router = express.Router();
const Club = require('../models/club');
const isAuthenticate = require('../middleware/isAuthenticate');
const isAdmin = require('../middleware/isAdmin');

router.post('/', [isAuthenticate, isAdmin], (req, res) => {
    const club = new Club({
        clubName: req.body.clubName,
        members: req.body.members
    });
    club.save((err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            message: "club save",
            status: 200,
            data: doc,
            error: null
        });
    })
});

router.put('/:id', [isAuthenticate, isAdmin], (req, res) => {
    const id = req.params.id;
    const club = new Club({
        clubName: req.body.clubName,
        members: req.body.members
    });
    Club.findByIdAndUpdate(id, club, (err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            message: "club modifié avec succès",
            data: doc,
            status: 200,
            error: null
        });
    });
});

router.get('/', [isAuthenticate, isAdmin], (req, res) => {
    Club.find({}, (err, docs) => {
        if (err) return res.json(err);
        const clubs = docs;
        res.send({ message: "OK", decoded: req.decoded, clubsFetched: clubs });
    });
});

router.get('/:id', isAuthenticate, (req, res) => {
    const id = req.params.id;
    Club.findById({ _id: id }, (err, doc) => {
        if (err) return res.json({ error: err });
        res.json({ 
            message: "OK", 
            data: doc, 
            status: 200,
            error: null });
    })
});

module.exports = router;