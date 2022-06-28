const express = require('express');
const router = express.Router();
const {signup, login, logout} = require('../controllers/authController');
const { verifyToken } = require('../middleware/verifyToken')

router.get('/logout', verifyToken, logout);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;