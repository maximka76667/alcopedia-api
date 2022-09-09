const { LOGIN, PASSWORD } = process.env;

const PORT = 3001;
const DB_URL = `mongodb+srv://${LOGIN}:${PASSWORD}@cluster0.h9ihfyc.mongodb.net/?retryWrites=true&w=majority`

module.exports = { DB_URL, PORT };