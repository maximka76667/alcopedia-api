const router = require('express').Router();

router.use('/drink', require('./drinks'));
router.use('/', require('./users'));

module.exports = router;
