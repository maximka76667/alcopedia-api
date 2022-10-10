const Drink = require('../models/drink');
const { handleErrors } = require('../errors');
// const { errorMessages: {
// forbiddenErrorMessage, notFoundErrorMessages: { cards: cardsErrorMessage } } } =
// require('../errors/error-config');

const getDrinks = (req, res, next) => {
  Drink.find()
    .then((drinks) => res.send({ drinks }))
    .catch((err) => next(handleErrors(err)));
};

const addDrink = (req, res, next) => {
  Drink.create(req.body)
    .then((drink) => res.send(drink))
    .catch((err) => next(handleErrors(err)));
};

const deleteDrink = (req, res, next) => {
  Drink.deleteOne({ name: req.body.name })
    .then((drink) => res.send(drink))
    .catch((err) => next(handleErrors(err)));
};

module.exports = {
  getDrinks,
  addDrink,
  deleteDrink,
};
