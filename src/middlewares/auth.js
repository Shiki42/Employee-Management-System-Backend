const jwt = require('jsonwebtoken');

exports.loginRequired = async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      return next();
    }
    return next({
      status: 401,
      message: 'Please login first',
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Please login first',
    });
  }
};

exports.ensureAdminAuthorization = async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded && decoded.role === 'HR') {
      return next();
    }
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  }
};

exports.ensureUserAuthorization = async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded && decoded.id === req.params.id && req) {
      return next();
    }
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  }
};
