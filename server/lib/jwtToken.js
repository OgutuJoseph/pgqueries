/* eslint-disable max-len */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtSecret');
const { APIError } = require('./errors');

const generateToken = (data, time) =>
  new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: time ? `${time}h` : '48h' }, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded);
    });
  });

const verifyTokenAsyc = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new APIError('Wrong Token', 400);
    } else {
      throw new APIError('Something went wrong', 400);
    }
  }
};

module.exports = {
  generateToken,
  verifyToken,
  verifyTokenAsyc,
};
