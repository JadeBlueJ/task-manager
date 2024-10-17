const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SecretKey;

exports.verifyToken = async (req, res, next) => {
  try {
    let bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined')
      return res.status(403).json({
        message: 'No token provided!',
      });
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized access!',
        });
      }
      res.locals.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Unauthorized access!',
    });
  }
};
