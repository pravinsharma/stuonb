const express = require('express');
const router = express.Router();

const courses = require('../controllers/course.controller');

// Create a new Course
router.post('/', courses.create);

// Retrieve all Course
router.get('/', courses.findAll);

// Retrieve a single Course with id
router.get('/:id', courses.findOne);

// Update a Course with id
router.put('/:id', courses.update);

// Delete a Course with id
router.delete('/:id', courses.delete);

module.exports = router;