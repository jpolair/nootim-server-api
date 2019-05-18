const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const isAuthenticate = require('../middleware/isAuthenticate');

createMessage = (req) => {
    return new Message({
        clubId: req.body.clubId,
        owner: req.body.owner,
        content: req.body.content,
        hearts: req.body.hearts,
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
        .populate('owner', 'firstname lastname')
        .exec()
        .then((doc) => {
            res.json({
                status: 200,
                message: 'Liste des messages trouvée',
                data: doc,
                error: null
            });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

router.get('/:id', isAuthenticate, (req, res) => {
    const id = req.params.id;
    Message.findById(id, (err, doc) => {
        if (err) res.json({ error: err });
        res.json({
            status: 200,
            message: 'Message trouvé',
            data: doc,
            error: null
        });
    });
});

router.get('/my', isAuthenticate, (req, res) => {
    Message
        .find({ owner: req.decoded.userId })
        .populate('user')
        .exec((err, doc) => {
            res.json({
                status: 200,
                message: "messages du user trouvés",
                data: doc,
                error: null
            });
        })
        .catch((err) => {
            res.json({ error: err }).sendStatus(500);
        });
});

router.put('/:id/hearts', isAuthenticate, (req, res) => {
    const userId = req.body.userId;
    const messageId = req.params.id;
    Message.findOne({ _id: messageId }, (err, doc) => {
        if (err) res.json({ error: err });
        if (doc.hearts.indexOf(userId) === - 1) {
            Message.updateOne({ _id: messageId, hearts: { $nin: [userId] } },
                { $push: { hearts: userId } },
                (err, doc) => {
                    if (err) res.json({ error: err });
                    res.json({
                        status: 200,
                        message: "hearts mis à jour",
                        data: doc,
                        error: null
                    });
                });
        }
        if (doc.hearts.indexOf(userId) !== - 1) {
            Message.updateOne({ _id: messageId, hearts: { $in: [userId] } },
                { $pull: { hearts: userId } },
                (err, doc) => {
                    if (err) res.json({ error: err });
                    res.json({
                        status: 200,
                        message: "hearts mis à jour",
                        data: doc,
                        error: null
                    });
                });
        }
    });
});

module.exports = router;