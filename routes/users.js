const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuthenticate = require('../middleware/isAuthenticate');
const isAdmin = require('../middleware/isAdmin');

createUser = (req) => {
    return new User({
        isAdmin: req.body.isAdmin,
        isAdherent: req.body.isAdherent,
        isActive: req.body.isActive,
        avatar: req.body.avatar,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        birthdate: req.body.birthdate,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        results: req.body.results,
        level: req.body.level,
        clubId: req.body.clubId
    });
}

router.get('/', isAuthenticate, (req, res) => {
    User.find({ clubId: { $in: req.decoded.clubId } }, { password: 0 }, (err, doc) => {
        if (err) return res.json(err);
        res.json({
            message: "users trouvés",
            users: doc
        });
    });
});

router.get('/me', isAuthenticate, (req, res) => {
    const id = req.decoded.userId;
    User.findById(id, { password: 0 }, (err, doc) => {
        if (err) return res.json(err);
        res.json({
            message: "user (me) trouvé",
            status: 200,
            userFetched: doc
        });
    });
})
router.post('/', [isAuthenticate, isAdmin], (req, res) => {
    const user = createUser(req);
    user.save((err, doc) => {
        if (err) return res.json(err);
        res.json({
            message: "user save",
            status: 200
        });
    })
});

router.post('/many', [isAuthenticate, isAdmin], (req, res) => {
    User.insertMany(req.body,  (err, doc) =>{
        if (err) return res.json(err);
        res.json({
            message: 'users saved',
            status: 200,
            usersSaved: doc
        });
    });
});

router.get('/:id', isAuthenticate, (req, res) => {
    const id = req.params.id;
    User.findById(id, { password: 0 }, (err, doc) => {
        if (err) return res.json(err);
        res.json({
            message: "user trouvé par id",
            status: 200,
            userFetched: doc
        });
    });
});

router.put('/:id', isAuthenticate, (req, res) => {
    const id = req.params.id;
    if (id === req.decoded.userId) {
        const user = createUser(req);
        User.findByIdAndUpdate(id, user, (err, doc) => {
            if (err) return res.json(err);
            res.json({
                message: "user modifié",
                user: doc,
                status: 200
            });
        });
    }
    if (id !== req.decoded.userId) {
        res.json({
            message: "Pas les droits de modification pour cet utilisateur",
            status: 401
        })
    }
});

module.exports = router;