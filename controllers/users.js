const jwt = require('jsonwebtoken');
const validator = require('validator');

const { JWT_SECRET } = process.env;
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { FRONT_URL } = require('../config');
const { generateMailOptions, transport } = require('../services/mail');
const mailMessages = require('../config/mail');
const { handleErrors, BadRequestError, NotFoundError } = require('../errors');
const { errorMessages } = require('../errors/error-config');

const sendMagicLink = async (email, linkId, type) => {
  const link = `${FRONT_URL}/${email}/${linkId}`;

  const mailOptions = generateMailOptions(email, link, type);

  try {
    await transport.sendMail(mailOptions);
    console.log(mailMessages.sent);
  } catch (err) {
    throw new Error(err);
  }
};

const register = async (email) => {
  try {
    const user = await User.create({
      email,
      magicLink: uuidv4(),
    });

    sendMagicLink(email, user.magicLink, 'signup');
  } catch (err) {
    throw new Error(err);
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

        try {
          sendMagicLink(email, userWithoutLink.magicLink, 'signin');
        } catch (err) {
          throw new Error(err);
        }
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

function getUser(req, res, next) {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError();
      res.send({ user });
    })

    .catch((err) => next(handleErrors(err)));
}

module.exports = { login, getUser };
