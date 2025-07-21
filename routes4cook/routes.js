const express = require('express');
const router= express.Router();

// write your required model imports here
const { register, login } = require('../controllers/authController');
const Recipe = require('../models/Recipe');

// write your middleware imports here
const authRateLimiter  = require("../middlewares/rateLimiter");

// Base route
router.get('/', (req, res) => {
  res.status(200).send('This is Bawarchi backend\nServer working on localhost:5000');
});

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);

// Recipe routes
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';
    const ingredients = query.split(/,|\s+and\s+|\s+or\s+/i).map(i => i.trim()).filter(Boolean);

    const recipes = await Recipe.find({
      ingredients: { $in: ingredients }
    }).limit(20);

    res.json({ recipes });
  } catch (err) {
    console.error('❌ Search error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;