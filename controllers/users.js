const jwt = require('jsonwebtoken');
const validator = require('validator');

const { JWT_SECRET } = process.env;
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { sendMagicLink } = require('./emails');

const register = async (email) => {
  try {
    const newUser = {
      Email: email,
      MagicLink: uuidv4(),
      // ever activated if not remove later with cron
    };
    const user = await User.create(newUser);
    // send magic link to email
    sendMagicLink(email, user.MagicLink, 'signup');
    return ({ ok: true, message: 'User created' });
  } catch (err) {
    return ({ ok: false, err });
  }
};

const login = async (req, res) => {
  const { email, magicLink } = req.body;
  if (!email) return res.json({ ok: false, message: 'All field are required' });
  if (!validator.isEmail(email)) return res.json({ ok: false, message: 'invalid email provided' });

  if (!magicLink) {
    try {
      const userWithoutLink = await User.findOneAndUpdate(
        { email },
        { MagicLink: uuidv4(), isMagicLinkExpired: false },
        { returnDocument: 'after' },
      );
        // send email with magic link
      sendMagicLink(email, userWithoutLink.MagicLink);
      return res.send({ ok: true, message: 'Hit the link in email to sign in' });
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const user = await User.findOne({ Email: email });

    if (!user) {
      await register(email);
      return res.send({ ok: true, message: 'Your account has been created, click the link in email to sign in 👻' });
    }

    if (user.MagicLink === magicLink && !user.isMagicLinkExpired) {
      const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '1h' }); // {expiresIn:'365d'}
      await User.findOneAndUpdate(
        { email },
        { isMagicLinkExpired: true },
      );
      return res.json({
        ok: true, message: 'Welcome back', token, email,
      });
    }
    return res.json({ ok: false, message: 'Magic link expired or incorrect 🤔' });
  } catch (err) {
    return res.json({ ok: false, err });
  }
};

const verifyToken = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, succ) => {
    if (err) {
      return res.json({ ok: false, message: 'something went wrong' });
    }
    return res.json({ ok: true, succ });
  });
};

module.exports = { login, verifyToken };
