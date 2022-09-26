const router = require('express').Router();
const { login, verifyToken } = require('../controllers/users');

router.post('/login', login);
router.post('/verify', verifyToken);

module.exports = router;
