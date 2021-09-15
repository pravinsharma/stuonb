const express = require('express');
const router = express.Router();

const sessions = require('../controllers/session.controller');

// Create a new Student
router.post('/', sessions.create);

// Retrieve all Student
router.get('/', sessions.findAll);

// Retrieve a single Student with id
router.get('/:id', sessions.findOne);

module.exports = router;