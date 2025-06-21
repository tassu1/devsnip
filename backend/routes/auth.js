const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middlewares/auth');

// @route   POST api/auth/register
// @desc    Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6+ characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ name, email, password });
      await user.save();

      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      console.log('Looking for user:', email); // Debug log
      let user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        console.log('User not found:', email); // Debug log
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      console.log('Comparing passwords...'); // Debug log
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        console.log('Password mismatch for user:', email); // Debug log
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      console.log('Creating JWT token...'); // Debug log
      const payload = { user: { id: user.id } };
      
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
          if (err) {
            console.error('JWT Error:', err); // Debug log
            throw err;
          }
          console.log('Login successful for:', email); // Debug log
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Login Error:', err.message); // Detailed error log
      res.status(500).json({ 
        error: 'Server error',
        details: err.message 
      });
    }
  }
);

// routes/auth.js
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
// @route   GET api/auth/user