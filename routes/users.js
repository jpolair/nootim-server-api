const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res) => {

})

router.get('/', (req, res) => {
    res.send({ message: "OK" });
});

router.post('/', (req, res) => {
    const user = new User({
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
    user.save( (err, doc) => {
        if (err)  return res.json(err);
        console.log('user save ', doc);
        res.json({
            message: "user save",
            status: 200
        });
    })

});

router.get('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

module.exports = router;