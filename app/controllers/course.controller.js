const courseService = require('../services/course.service');

// Create/Save a new Course
exports.create = (req, res) => {
    courseService
    .create(
        req.body.name,
        req.body.desc)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the course."
        });
    });
};

// Retrieve and return all courses from the database.
exports.findAll = (req, res) => {
    courseService
    .findAll()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    courseService
    .findById(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving course."
        });
    });
};

// Update a course identified by the id in the request
exports.update = (req, res) => {
    courseService
    .create(
        req.params.id,
        req.body.name,
        req.body.desc)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the course."
        });
    });
};

// Delete a course with the specified id in the request
exports.delete = (req, res) => {
    courseService
    .delete(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting course."
        });
    });
};