const nodemailer = require('nodemailer');

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});
const URL = 'http://localhost:3000/#/auth/';

const sendMagicLink = async (email, link, which) => {
  let subj = 'Your sign in link';
  let body = `<p>Hello friend and welcome back. This is your link to sign in to your account: ${URL + email}/${link}</p><p>Needless to remind you not to share this link with anyone 🤫</p>`;

  if (which === 'signup') {
    subj = 'Your sign up link';
    body = `<p>Hello friend and welcome to our website. This is your link to confirm your account: ${URL + email}/${link}</p><p>Needless to remind you not to share this link with anyone 🤫</p>`;
  }

  const mailOptions = {
    to: email,
    from: NODEMAILER_EMAIL,
    subject: subj,
    html: body,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Link sent 📬');
    return ({ ok: true, message: 'email sent' });
  } catch (err) {
    console.log('Something didn\'t work out 😭', err);
    return ({ ok: false, message: err });
  }
};

module.exports = { sendMagicLink };
