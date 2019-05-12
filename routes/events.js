const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const isAuthenticate = require('../middleware/isAuthenticate');
const isAdmin = require('../middleware/isAdmin');

function createEvent(req) {
    return new Event({
        clubId: req.body.clubId,
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        title: req.body.title,
        description: req.body.description
    });
}

router.post('/', [isAuthenticate, isAdmin], (req, res) => {
    const event = createEvent(req);
    event.save((err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            message: "event save",
            status: 200,
            data: doc,
            error: null
        });
    })
});

router.put('/:id', [isAuthenticate, isAdmin], (req, res) => {
    const event = createEvent(req);
    Event.findByIdAndUpdate(id, event, (err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            message: "event modifié avec succès",
            data: doc,
            status: 200,
            error: null
        });
    });
});

router.get('/', isAuthenticate, (req, res) => {
    Event.find({ clubId: { $in: req.decoded.clubId } }, function (err, doc) {
        if (err) return res.json({ error: err });
        res.json({ 
            status: 200, 
            message: 'Liste des events trouvée', 
            data: doc,
            error: null 
        });
    });
});

router.get('/:id', isAuthenticate, (req, res) => {
    const id = req.params.id;
    Event.find({ _id: id, clubId: { $in: req.decoded.clubId } }, function (err, doc) {
        if (err) return res.json({ error: err });
        res.json({ 
            status: 200, 
            message: 'Liste des events trouvée', 
            data: doc,
            error: null 
        });
    });
});

module.exports = router;