require('dotenv').config();
const express = require('express')
const app = express() // notice that the app instance is called `app`, this is very important.

const mongoose = require('mongoose');

const { DB_URL, PORT } = require("./config");

const connectDB = async () => {
  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/drink", require('./routes/index'));

connectDB();
app.listen(PORT);

// no need for `app.listen()` on Deta, we run the app automatically.
module.exports = app; // make sure to export your `app` instance.
