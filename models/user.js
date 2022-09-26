const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {

    name: {
      type: String,
      required: false,
      unique: false,
      default: 'Anonymous',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    magicLink: {
      type: String,
      required: false,
      unique: false,
      default: uuidv4,
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
