const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { jwtSecret } = require('../utils/config');

exports.verifyToken = async (req, res, next) => {
  try {
    let bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined')
      return res.status(403).json({
        message: 'No token provided!',
      });
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
      console.log("decoded", decoded);
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized access!',
        });
      }
      req.user = decoded
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Unauthorized access!',
    });
  }
};
