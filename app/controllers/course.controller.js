const Course = require('../models/schema/course.schema');

// Create/Save a new Course
exports.create = (req, res) => {console.log('name: ', req.body);
    if(!req.body.name) {
        return res.status(400).send({
            message: "No changes given..."
        });
    }

    // Create a Course
    const course = new Course({
        name: req.body.name,
        desc: req.body.desc || "NA"
    });

    // Save Course in the database
    course.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Course."
        });
    });
};

// Retrieve and return all courses from the database.
exports.findAll = (req, res) => {
    Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    Course.findById(req.params.id)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });            
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving course with id " + req.params.id
        });
    });
};

// Update a course identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "No selection given..."
        });
    }

    // Find course and update it with the request body
    Course.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        desc: req.body.desc || "NA"
    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });
        }
        res.send(course);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating course with id " + req.params.id
        });
    });
};

// Delete a course with the specified id in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.id)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });
        }
        res.send({message: "Course deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete course with id " + req.params.id
        });
    });
};