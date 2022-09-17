const ForbiddenError = require('./forbidden-error');
const handleErrors = require('./handle-errors');
const NotFoundError = require('./not-found-error');
const UnauthorizedError = require('./unauthorized-error');
const BadRequestError = require('./bad-request-error');

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  handleErrors,
};
