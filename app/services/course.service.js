const Course = require('../models/schema/course.schema');
var { errmsg } = require('../utils/constants');

const courseService = {
    create: (name, desc) => {
        if(!name) {
            return new Error(errmsg.e100);
        }

        // Create a Course
        const course = new Course({
            name, desc
        });

        // Save Course in the database
        return course.save()
            .then(data => data)
            .catch(err => err);
    },
    findAll: () => {
        // Retrieve and return all courses from the database.
        return Course.find()
            .then(data => data)
            .catch(err => err);
    },
    findOne: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        // Retrieve and return all courses from the database.
        return Course.findById(id)
            .then(data => data)
            .catch(err => err);
    },
    update: (id, name, desc) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        // Find course and update it with the request body
        return Course.findByIdAndUpdate(id, {
            name, desc
        }, {new: true})
        .then(course => course)
        .catch(err => err);
    },
    delete: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        return Course.findByIdAndRemove(id)
        .then(course => course)
        .catch(err => err);
    }
};

module.exports = courseService;