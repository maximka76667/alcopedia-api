const mongoose = require('mongoose');
const validator = require('validator');

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
      validator: (link) => validator.isURL(link),
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
