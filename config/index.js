const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('./cors');
const { DB_URL } = require('./db');
const { FRONT_URL, PORT, JWT_SECRET_DEV } = require('./main');

module.exports = {
  ALLOWED_CORS, DEFAULT_ALLOWED_METHODS, DB_URL, PORT, FRONT_URL, JWT_SECRET_DEV,
};