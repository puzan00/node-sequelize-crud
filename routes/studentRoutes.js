const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/', async (req, res) => {
  try {
    // Check if the user is logged in
    const loggedIn = req.session.userId ? true : false;

    if (!loggedIn) {
      return res.redirect('/auth/login');
    }

    // Fetch students data for the logged-in user
    const userId = req.session.userId;
    const students = await Student.findAll({ where: { userId } });

    res.render('index', { students, loggedIn });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    const { firstName, lastName, age, phoneNumber, email } = req.body;
    const userId = req.session.userId;
    await Student.create({ firstName, lastName, age, phoneNumber, email, userId });
    res.redirect('/');
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    const student = await Student.findByPk(req.params.id);
    if (student){
      res.render('edit', { student });
    }
    else{
      res.redirect('/');
    }
    
  } catch (error) {
    console.error('Error fetching student for edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    const { firstName, lastName, age, phoneNumber, email } = req.body;
    await Student.update(
      { firstName, lastName, age, phoneNumber, email },
      { where: { id: req.params.id } }
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/delete/:id', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    await Student.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;