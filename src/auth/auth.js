const jwt = require('jsonwebtoken');
const env = require('../env');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decodedToken = jwt.verify(token, env.get('SECRET_KEY'));
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
