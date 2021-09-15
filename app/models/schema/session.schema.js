var mongoose = require('../../utils/mongo_connection');
const refHelper = require('../../utils/reference.helper');

var SessionSchema = new mongoose.Schema({
	id: { type: String },
	userid: {
		type: String,
		required: true,
		ref: "Student",
		validate: {
			isAsync: true,
			validator: (v) =>refHelper(mongoose.model("student"), v),
			message: `Student doesn't exist...`
		}
	},
	token: { type: String, required: true },
	expires: { type: Number, default: 28800000 }
}, {
    timestamps: true
});

module.exports = mongoose.model(
	'session', SessionSchema, 'Sessions');
