const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Render registration form with no error initially
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error registering user:', error);
    // Render registration form with error message if registration fails
    res.status(500).render('register', { error: 'User already exists. Please try again.' });
  }
});

// Render login form with no error initially
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login form submission
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found');
      return res.status(404).render('login', { error: 'User not found' });
    }
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).render('login', { error: 'Invalid password' });
    }
    // Set session and redirect to home page on successful login
    req.session.userId = user.id;
    console.log('Login successful');
    res.redirect('/');
  } catch (error) {
    console.error('Error logging in:', error);
    // Render login form with error message if login fails
    res.status(500).render('login', { error: 'Error logging in. Please try again.' });
  }
});

// Handle logout and redirect to login page
router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log('Logout successful');
  res.redirect('/auth/login');
});

module.exports = router;
