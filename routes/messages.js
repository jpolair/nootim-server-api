const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const isAuthenticate = require('../middleware/isAuthenticate');

createMessage = (req) => {
    return new Message({
        clubId: req.body.clubId,
        owner: req.body.owner,
        content: req.body.content,
        media: req.body.media
    });
}

router.post('/', (req, res) => {
    const message = createMessage(req);
    message.save((err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            message: "Message sauvegardé",
            status: 200,
            data: doc,
            error: null
        });
    });
});

router.get('/', isAuthenticate, (req, res) => {
    Message.find({ clubId: { $in: req.decoded.clubId } })
    .populate('owner','firstname lastname')
    .exec()
    .then( (doc) => {
        res.json({
            status: 200,
            message: 'Liste des messages trouvée',
            data: doc,
            error: null
        });
    })
    .catch( (err) => {
        res.json({ error: err });
    });
});

router.get('/my', isAuthenticate, (req, res) => {
    Message
        .find({owner: req.decoded.userId})
        .populate('user')
        .exec((err, doc) => {
            res.json({
                status: 200,
                message: "messages du user trouvés",
                data: doc,
                error: null
            });
        })
        .catch( (err) => {
            res.json({ error: err });
        });
});

module.exports = router;