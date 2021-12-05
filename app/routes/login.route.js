const express = require('express');
const router = express.Router();

const logins = require('../controllers/login.controller');

// Register a new Student
router.post('/signup', logins.register);

// Retrieve all Student
router.get('/signin', logins.login);

module.exports = router;