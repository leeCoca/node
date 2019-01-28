const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log("error");
	} else {
		console.log("success");
	}
});

const Schema = mongoose.Schema

const blogSchema = new Schema({
	title: {
		type: String,
		requied: true
	},
	content: {
		type: String,
		requied: true
	},
	img: {
		type: String
	},
	created_time: {
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('Blog', blogSchema);