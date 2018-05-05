const jwt = require('jwt-simple');
const { User } = require('../db').models;

const auth = (req, res, next) => {
  if (!req.headers.token) {
    next();
  }
  User.exchangeToken(req.headers.token).then(user => {
    req.user = user;
    next();
  });
};

const mustHaveUser = (req, res, next) => {
  if (!req.user) {
    return next({ status: 401 });
  }
  if (req.user.id !== req.params.userId * 1) return next({ status: 401 });
  next();
};

module.exports = auth;
