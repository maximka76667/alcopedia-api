const mailMessages = {
  signin: {
    subject: 'Your sign in link',
    html: '<p>Hello my friend and welcome back. This is your link to sign in to your account: $link </p><p>Needless to remind you not to share this link with anyone 🤫</p>',
  },
  signup: {
    subject: 'Your sign up link',
    html: '<p>Hello friend and welcome to our website. This is your link to confirm your account: $link </p><p>Needless to remind you not to share this link with anyone 🤫</p>',
  },
  sent: 'Link sent 📬',
  error: 'Something didn\'t work out 😭',
};

module.exports = mailMessages;
