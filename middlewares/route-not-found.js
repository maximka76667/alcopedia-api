const { errorMessages } = require('../errors/error-config');
const { NotFoundError } = require('../errors');

module.exports = (req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundErrorMessages.routes));
};
