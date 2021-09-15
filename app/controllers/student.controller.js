const studentService = require('../services/student.service');

// Create/Save a new Student
exports.create = (req, res) => {
    studentService
    .create(
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.passwd,
        req.body.roll,
        req.body.age,
        req.body.address,
        req.body.courseid)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    studentService
    .findAll()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a id
exports.findOne = (req, res) => {
    studentService
    .findById(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving student."
        });
    });
};

// Update a student identified by the id in the request
exports.update = (req, res) => {
    studentService
    .create(
        req.params.id,
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.passwd,
        req.body.roll,
        req.body.age,
        req.body.address,
        req.body.courseid)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the student."
        });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    studentService
    .delete(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting student."
        });
    });
};