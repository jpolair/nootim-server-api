module.exports = function (req, res, next) {
    if (req.decoded.isAdmin) {
        next();
    } else {
        res.json({
            message: "Il faut être admin pour cette opération",
            status: 401
        });
    }
}