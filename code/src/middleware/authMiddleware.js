// /src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('properties');

const secretKey = properties.get('secretKey');

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {

    return jwt.verify(token, secretKey);

  } catch (error) {

    return null;

  }
}

function protectEndpoints(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = decodedToken;

  next();
}

module.exports = { generateToken, protectEndpoints };
