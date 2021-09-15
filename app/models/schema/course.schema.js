var mongoose = require('../../utils/mongo_connection');

var CourseSchema = new mongoose.Schema({
	id: { type: String },
	name: { type: String },
	desc: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model(
	'course', CourseSchema, 'Courses');
