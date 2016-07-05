var Book = require("../models/postModels")

function create(req, res){
	var newBook = new Book({
		title: req.body.title,
		author: req.body.author,
		ISBN: req.body.ISBN,
		price: req.body.price,
		condition: req.body.condition,
		createdBy: req.user._id,
		sellerEmail: req.user.local.email,
		hidden: false,
		//optional:
		description: req.body.description,
		photo: req.body.photo, //URL
		courseID: req.body.courseID,
		subject: req.body.subject,
		})

	newBook.save(function (err, book) {
		if (err) return console.error(err);
		res.writeHead(200, {'Content-Type': 'text/JSON'})
		res.end(JSON.stringify(book))
	});
}
function retrieveAll(req, res){
	Book.find(function (err, book) {
			if (err) return console.error(err);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(book))
		})
}
//get Book:slug
function retrieveOne(req, res){
	Book.findOne({_id: req.params._id},function (err, book) {
			if (err) return console.error(err);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(book))
		})
}
function retrieveBuyerBooks(req, res){
	Book.find({createdBy: req.user._id},function (err, book) {
			if (err) return console.error(err);
			console.log('retrieveBuyerBooks');
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(book))
		})
}
function deletion(req, res){
	Book.remove({
		_id: req.params._id,
		}, 
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log('deletion')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		});
		console.log('recieved a DELETE request')
}
function deleteByUser(req, res){
	Book.remove({createdBy: req.params._id}, 
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log('delete by user')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		});
		console.log('recieved a DELETE request')
}
// PUT
function change(req, res){
	var query = { _id: req.params._id};
		Book.findOneAndUpdate(query, {
			title: req.body.title,
			author: req.body.author,
			ISBN: req.body.ISBN,
			price: req.body.price,
			condition: req.body.condition,
			createdBy: req.user._id,
			sellerEmail: req.user.local.email,
			hidden: false,
			//optional:
			description: req.body.description,
			photo: req.body.photo, //URL
			courseID: req.body.courseID,
			subject: req.body.subject,
			},
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log('changed')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		})
		console.log('recieved a PUT request')
}

function hideBook(req, res){
	var query = {createdBy: req.params._id};
		Book.update(query,			
		 {$set: {hidden: req.body.hidden}},
		 {multi: true}, 
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log('changed')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		})
		console.log('recieved a PUT request')
}
module.exports = {
	create,
	retrieveBuyerBooks,
	retrieveAll,
	retrieveOne,
	deletion,
	change,
	deleteByUser,
	hideBook,
}