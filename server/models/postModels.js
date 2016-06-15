var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	author: String,
	body: String,
	date: {type: Date, default: Date.now},
	hidden: Boolean,
	slug: String,
});

var Post = mongoose.model('post', postSchema)

module.exports = Post