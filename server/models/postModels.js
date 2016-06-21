var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	//required:
	title: String,
	author: String,
	ISBN: String,
	price: String,
	condition: String,
	datePosted: {type: Date, default: Date.now},
	//optional:
	photo: String, //URL
	courseID: String,
	subject: String,
	slug: String,
});

var Book = mongoose.model('book', postSchema)

module.exports = Book