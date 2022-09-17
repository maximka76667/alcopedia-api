const BadRequestError = require('./bad-request-error');
const ConflictError = require('./conflict-error');
const { errorMessages } = require('./error-config');

const handleErrors = (err) => {
  // Delete console.log
  console.log(err);
  if (err.name === 'MongoServerError' && err.code === 11000) return new ConflictError(errorMessages.conflictErrorMessage);
  if (err.name === 'CastError') return new BadRequestError(errorMessages.castErrorMessage);
  if (err.name === 'ValidationError') return new BadRequestError(errorMessages.validationErrorMessage.default);
  return err;
};

module.exports = handleErrors;
