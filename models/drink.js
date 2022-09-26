const mongoose = require('mongoose');
const { URL } = require('url');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        try {
          new URL(link);
          return true;
        } catch (error) {
          return false;
        }
      },
    },
  },
  ingredients: {
    type: {},
    required: true,
  },
  extra: {
    type: [{
      type: String,
    }],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  versionKey: false,
});

module.exports = mongoose.model('drink', drinkSchema);
