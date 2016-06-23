
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	//required:
	title: String,
	author: String,
	ISBN: String,
	price: String,
	condition: String,
	slug: String,
	date: { type: Date, default: Date.now },
	//createdBy: {req.user.email}
	//optional:
	description: String,
	photo: String, //URL
	courseID: String,
	subject: String,
	
});

var Book = mongoose.model('book', bookSchema)

module.exports = Book