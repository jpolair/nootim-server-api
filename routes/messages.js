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
        if (err) return res.json(err);
        res.json({
            message: "Message sauvegardé",
            status: 200,
            messageSaved: doc
        });
    });
});

router.get('/', isAuthenticate, (req, res) => {
    Message.find({ clubId: { $in: req.decoded.clubId } }, function (err, doc) {
        if (err) return res.json({ err });
        res.json({
            status: 200,
            message: 'Liste des messages trouvée',
            messagesFetched: doc
        });
    });
});

router.get('/my', isAuthenticate, (req, res) => {
    Message
        .find({owner: req.decoded.userId})
        .populate('user')
        .exec((err, doc) => {
            if (err) return res.json(err);
            res.json({
                message: "messages du user trouvés",
                messagesFetched: doc
            });
        });
});

module.exports = router;