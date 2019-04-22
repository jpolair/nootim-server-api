const jwt = require('jsonwebtoken');
const stringSecret = 'aqwxszedcvfrtkjhgfù2';

module.exports = function (req, res, next) {
  const bearerToken = req.headers['authorization'];
  const token = bearerToken.split(' ')[1];
  if (!token) return res.json({ status: 401, message: 'Pas de token d\'accès'});
  if (token) {
    try {
      const decoded = jwt.verify(token, stringSecret);
      req.decoded = decoded;
      next();
    }
    catch(err) {
      res.json({ status: 400, message: 'Invalid data'});
    }
  }
}