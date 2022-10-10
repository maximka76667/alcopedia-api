const router = require('express').Router();

const { addDrink, deleteDrink } = require('../controllers/drinks');

router.post('/', addDrink);
router.delete('/', deleteDrink);

module.exports = router;
