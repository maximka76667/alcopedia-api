const auth = require('./auth');
const { requestLogger, errorLogger } = require('./logger');
const routeNotFound = require('./route-not-found');
const limiter = require('./rate-limiter');
const errorHandler = require('./error-handler');

module.exports = {
  auth,
  requestLogger,
  errorLogger,
  routeNotFound,
  limiter,
  errorHandler,
};
