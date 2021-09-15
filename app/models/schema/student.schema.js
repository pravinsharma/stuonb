var mongoose = require('../../utils/mongo_connection');
const refHelper = require('../../utils/reference.helper');

var StudentSchema = new mongoose.Schema({
	id: { type: String },
	fname: { type: String, default: 'anonymous' },
	lname: { type: String, default: null },
	email: { type: String, unique: true, required: true },
	passwd: { type: String },
	roll: { type: String },
	age: { type: Number },
	address: { type: String },
	courseid: {
		type: String,
		required: true,
		ref: "Courses",
		validate: {
			isAsync: true,
			validator: (v) =>refHelper(mongoose.model("course"), v),
			message: `Course doesn't exist...`
		}
	}
}, {
    timestamps: true
});

module.exports = mongoose.model(
	'student', StudentSchema, 'Students');
