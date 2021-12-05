const Student = require('../models/schema/student.schema');
var { errmsg } = require('../utils/constants');

const studentService = {
    create: (fname, lname, email, passwd, roll, age, address, courseid) => {
        if(!(email && passwd)) {
            return new Error(errmsg.e100);
        }

        // Create a Student
        const student = new Student({
            fname, lname, email,
            passwd, roll, age,
            address, courseid
        });

        // Save Student in the database
        return student.save()
            .then(data => data)
            .catch(err => err);
    },
    findAll: () => {
        // Retrieve and return all students from the database.
        return Student.find()
            .then(data => data)
            .catch(err => err);
    },
    findOne: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }
        
        // Retrieve and return all students from the database.
        return Student.findById(id)
            .then(data => data)
            .catch(err => err);
    },
    findByEmail: (email) => {
        // Validate Request
        if(!email) {
            return new Error(errmsg.e100);
        }
        
        // Retrieve and return all students from the database.
        return Student.findOne({ email }).exec()
            .then(data => data)
            .catch(err => err);
    },
    update: (id, fname, lname, email, passwd, roll, age, address, courseid) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        // Find student and update it with the request body
        return Student.findByIdAndUpdate(id, {
            fname, lname, email,
            passwd, roll, age,
            address, courseid
        }, {new: true})
        .then(student => student)
        .catch(err => err);
    },
    delete: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        return Student.findByIdAndRemove(id)
        .then(student => student)
        .catch(err => err);
    }
};

module.exports = studentService;