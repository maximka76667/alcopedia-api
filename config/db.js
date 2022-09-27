const { LOGIN, PASSWORD } = process.env;

const DB_URL = `mongodb+srv://${LOGIN}:${PASSWORD}@cluster0.h9ihfyc.mongodb.net/?retryWrites=true&w=majority`;

module.exports = { DB_URL };
