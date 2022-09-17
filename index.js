require('dotenv').config();
const express = require('express')
const app = express() // notice that the app instance is called `app`, this is very important.

const mongoose = require('mongoose');

const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS, DB_URL, PORT } = require("./config");

const connectDB = async () => {
  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

// Security
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rate-limiter');

// Middlewares
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

app.use(requestLogger);

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (ALLOWED_CORS.includes(origin)) return callback(null, true);
      return callback(new Error('Ошибка CORS'), true);
    },
    methods: DEFAULT_ALLOWED_METHODS,
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
);

app.use("/drink", require('./routes/index'));

app.use(errorLogger);
app.use(errorHandler);

connectDB();
app.listen(PORT);

// no need for `app.listen()` on Deta, we run the app automatically.
module.exports = app; // make sure to export your `app` instance.
