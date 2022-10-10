const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {

    name: {
      type: String,
      default: 'Drinks enjoyer',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    magicLink: {
      type: String,
    },
    isMagicLinkExpired: {
      type: Boolean,
      default: false,
    },
  },
  { strictQuery: false },
);

const User = model('User', UserSchema);
module.exports = User;
