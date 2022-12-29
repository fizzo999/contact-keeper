const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //peel off token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied !!!' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    console.log(
      'we are inside middleware and here is decoded.user',
      decoded.user
    );
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
