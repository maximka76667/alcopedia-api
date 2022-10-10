const router = require('express').Router();

const { login } = require('../controllers/users');

router.post('/login', login);
router.use(require('../middlewares/auth'));
router.use('/', require('./users'));
router.use('/drink', require('./drinks'));

module.exports = router;
