const express = require('express');
const router= express.Router();

// write your required model imports here
const { register, login } = require('../controllers/authController');

// write your middleware imports here
const authRateLimiter  = require("../middlewares/rateLimiter");

// Base route
router.get('/', (req, res) => {
  res.status(200).send('This is Bawarchi backend\nServer working on localhost:5000');
});

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);

module.exports = router;