const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const sql = require('mssql');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.query`INSERT INTO Users (username, password) VALUES (${username}, ${hashedPassword})`;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
