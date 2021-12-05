var mongoose = require('../../utils/mongo_connection');
const refHelper = require('../../utils/reference.helper');
var { token } = require('../../utils/constants');

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
	expiresIn: { type: String, default: token.expiresIn }
}, {
    timestamps: true
});

module.exports = mongoose.model(
	'session', SessionSchema, 'Sessions');
