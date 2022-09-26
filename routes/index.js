const router = require('express').Router();

router.use('/drink', require('./drinks'));
router.use('/user', require('./users'));

module.exports = router;
