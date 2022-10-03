const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

const errorMessages = {
  validationErrorMessage: {
    default: 'Incorrect data',
    required: 'Email is required',
    link: 'Invalid link',
    email: 'Provided invalid email',
  },
  unauthorizedErrorMessage: 'Authorization is required',
  incorrectCredentialsErrorMessage: 'Incorrect email or password',
  forbiddenErrorMessage: 'Forbidden in access',
  notFoundErrorMessages: {
    users: 'User not found',
    routes: 'Location not found',
  },
  castErrorMessage: 'Invalid id',
  conflictErrorMessage: 'User with email already exist',
  defaultErrorMessage: 'Something went wrong',
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  errorMessages,
};
