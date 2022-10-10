const router = require('express').Router();

const { getDrinks } = require('../controllers/drinks');
const { login } = require('../controllers/users');

router.post('/login', login);
router.get('/drink', getDrinks);
router.use(require('../middlewares/auth'));
router.use('/', require('./users'));
router.use('/drink', require('./drinks'));

module.exports = router;
