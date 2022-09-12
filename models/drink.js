const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
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