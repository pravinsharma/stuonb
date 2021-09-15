const Student = require('../models/student.schema');

// Create/Save a new Student
exports.create = (req, res) => {
    if(!req.body.email || !req.body.courseid) {
        return res.status(400).send({
            message: "Data missing..."
        });
    }

    // Create a Student
    const student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        passwd: req.body.passwd,
        roll: req.body.roll,
        age: req.body.age,
        address: req.body.address,
        courseid: req.body.courseid
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a id
exports.findOne = (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.id
        });
    });
};

// Update a student identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "No selection given..."
        });
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.id, {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        passwd: req.body.passwd,
        roll: req.body.roll,
        age: req.body.age,
        address: req.body.address,
        courseid: req.body.courseid
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send(student);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.id
        });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.id
        });
    });
};