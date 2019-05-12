const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const isAuthenticate = require('../middleware/isAuthenticate');

createComment = (req) => {
    return new Comment({
        messageId: req.body.messageId,
        ownerMessage: req.body.ownerMessage,
        ownerComment: req.body.ownerComment,
        content: req.body.content,
        date: req.body.date
    });
}

router.post('/', isAuthenticate, (req, res) => {
    const comment = createComment(req);
    comment.save((err, doc) => {
        if (err) return res.json({ error:err });
        res.json({
            message: "Comment sauvegardé",
            status: 200,
            data: doc,
            error: null
        });
    });
});

router.get('/', isAuthenticate, (req, res) => {
    Comment.find({ clubId: { $in: req.decoded.clubId } }, function (err, doc) {
        if (err) return res.json({ error: err });
        res.json({ 
            status: 200, 
            message: 'Liste des comments trouvée', 
            data: doc,
            error: null 
        });
    });
});

router.get('/messages/:id', isAuthenticate, (req, res) => {
    messageId = req.params.id;
    Comment.find({ messageId: messageId})
    .populate('ownerMessage', 'firstname lastname')
    .populate('ownerComment', 'firstname lastname')
    .exec( (err, doc) => {
        if (err) return res.json({ error: err });
        res.json({
            status: 200,
            message: 'Liste des comments trouvée',
            data: doc,
            error: null
        });
    });

});
module.exports = router;