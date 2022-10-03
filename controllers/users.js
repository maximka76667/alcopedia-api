const jwt = require('jsonwebtoken');
const validator = require('validator');

const { JWT_SECRET } = process.env;
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { FRONT_URL } = require('../config');
const { generateMailOptions, transport } = require('../services/mail');
const mailMessages = require('../config/mail');
const handleErrors = require('../errors/handle-errors');
const BadRequestError = require('../errors/bad-request-error');
const { errorMessages } = require('../errors/error-config');

const sendMagicLink = async (email, linkId, type) => {
  const link = `${FRONT_URL}/${email}/${linkId}`;

  const mailOptions = generateMailOptions(email, link, type);

  try {
    await transport.sendMail(mailOptions);
    console.log(mailMessages.sent);
    return ({ ok: true, message: mailMessages.sent });
  } catch (err) {
    console.log(mailMessages.error, err);
    return ({ ok: false, message: err });
  }
};

const register = async (email) => {
  try {
    const user = await User.create({
      email,
      magicLink: uuidv4(),
    });

    // send magic link to email
    sendMagicLink(email, user.magicLink, 'signup');
    return ({ ok: true, message: 'User created' });
  } catch (err) {
    throw new Error();
  }
};

const login = async (req, res, next) => {
  const { email, magicLink } = req.body;
  if (!email) throw new BadRequestError(errorMessages.validationErrorMessage.required);
  if (!validator.isEmail(email)) {
    throw new BadRequestError(errorMessages.validationErrorMessage.email);
  }

  try {
    const user = await User.findOne({ email });

    // If there is no user - create one
    if (!user) {
      await register(email);
      return res.send({ message: 'Your account has been created, click the link in email to sign in 👻' });
    }

    // If user exists and tries to login without link - create link
    if (!magicLink) {
      try {
        const userWithoutLink = await User.findOneAndUpdate(
          { email },
          { magicLink: uuidv4(), isMagicLinkExpired: false },
          { returnDocument: 'after' },
        );
          // send email with magic link
        sendMagicLink(email, userWithoutLink.magicLink, 'signin');
        return res.send({ message: 'Hit the link in email to sign in' });
      } catch (err) {
        next(handleErrors(err));
      }
    }

    if (user.isMagicLinkExpired) {
      throw new Error('Magic link expired');
    }

    const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '1h' }); // {expiresIn:'365d'}
    await User.findOneAndUpdate(
      { email },
      { isMagicLinkExpired: true },
    );
    return res.json({
      message: 'Welcome back', token, email,
    });
  } catch (err) {
    next(handleErrors(err));
  }
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, succ) => {
    if (err) {
      return res.json({ ok: false, message: 'something went wrong' });
    }
    return res.json({ ok: true, succ });
  });
};

function getUser(req, res) {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => res.send({ user }))
    .catch((err) => console.log(err));
}

module.exports = { login, verifyToken, getUser };
