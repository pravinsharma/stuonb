const express = require('express');
const router = express.Router();

const students = require('../controllers/student.controller');

// Create a new Student
router.post('/', students.create);

// Retrieve all Student
router.get('/', students.findAll);

// Retrieve a single Student with id
router.get('/:id', students.findOne);

// Update a Note with id
router.put('/:id', students.update);

// Delete a Note with id
router.delete('/:id', students.delete);

module.exports = router;