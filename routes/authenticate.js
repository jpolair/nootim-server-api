const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const STRING_SECRET = process.env.STRING_SECRET || 'aqwxszedcvfrtkjhgfù2';

router.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) return res.json({ error: err });
        if (!user) return res.json({ success: false, message: "user not found" });
        if (user) {
            if (user.password != req.body.password) {
                return res.json({ success: false, message: "le password n'est pas bon" });
            }
            if (user.password === req.body.password && user.isActive) {
                const payload = {
                    isAdmin: user.isAdmin,
                    isAdherent: user.isAdherent,
                    userId: user._id,
                    clubId: user.clubId
                }
                const token = jwt.sign(payload, STRING_SECRET);
                res.json({
                    success: true,
                    token: token,
                    userId: user._id,
                    clubId: user.clubId
                });
            }
        }
    })
});


module.exports = router;