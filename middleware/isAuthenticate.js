const jwt = require('jsonwebtoken');
const STRING_SECRET = process.env.STRING_SECRET || 'aqwxszedcvfrtkjhgfù2';

module.exports = function (req, res, next) {
  const bearerToken = req.headers['authorization'] || null;
  const token = bearerToken != null ? bearerToken.split(' ')[1] : null;
  if (!token) return res.json({ status: 401, message: 'Pas de token d\'accès'});
  if (token) {
    try {
      const decoded = jwt.verify(token, STRING_SECRET);
      req.decoded = decoded;
      next();
    }
    catch(err) {
      res.json({ status: 400, message: 'Invalid data'});
    }
  }
}