const { LOGIN, PASSWORD } = process.env;

const ALLOWED_CORS = [
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'localhost:5000',
  'http://localhost:5000',
  'https://maximka76667.github.io',
  'maximka76667.github.io',
  'http://192.168.1.65:3000'
];
const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';
const PORT = 3001;
const DB_URL = `mongodb+srv://${LOGIN}:${PASSWORD}@cluster0.h9ihfyc.mongodb.net/?retryWrites=true&w=majority`

module.exports = { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS, DB_URL, PORT };