const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getDrinks, addDrink, deleteDrink,
} = require('../controllers/drinks');

router.get('/', getDrinks);
router.post('/', addDrink);
router.delete('/', deleteDrink);

module.exports = router;
