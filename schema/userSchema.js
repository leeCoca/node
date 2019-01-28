const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log("error");
	} else {
		console.log("success");
	}
});

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created_time: {
		type: Date,
		default: Date.now
	},
	last_modified_time: {
		type: Date,
		default: Date.now
	} 
})

module.exports = mongoose.model('UserMsg', userSchema);