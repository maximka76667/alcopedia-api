const nodemailer = require('nodemailer');

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;
const mailMessages = require('../config/mail');

const transport = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

const generateMailOptions = (email, link, type) => ({
  to: email,
  from: NODEMAILER_EMAIL,
  subject: mailMessages[type].subject,
  html: mailMessages[type].html.replace('$link', link),
});

module.exports = {
  generateMailOptions,
  transport,
};
