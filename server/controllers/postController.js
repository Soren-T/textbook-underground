var Book = require("../models/postModels")

function create(req, res){
	var newBook = new Book({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		slug: req.body.slug,
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
			console.log(book);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(book))
		})
}
//get Book:slug
function retrieveOne(req, res){
	Book.findOne({slug: req.params.slug},function (err, book) {
			if (err) return console.error(err);
			console.log(book);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(book))
		})
}
function deletion(req, res){
	Book.remove({
		slug: req.params.slug,
		}, 
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log(returnValue)
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		});
		console.log('recieved a DELETE request')
}
// PUT
function change(req, res){
	var query = { slug: req.params.slug};
		Book.findOneAndUpdate(query, { 
					title: req.body.title,
					author: req.body.author,
					body: req.body.body, 
					}, 
			function (err, returnValue) {
				if (err) return console.error(err);
				console.log(returnValue)
				res.writeHead(200, {'Content-Type': 'text/JSON'})
				res.end(JSON.stringify({success: true}))
		})
		console.log('recieved a PUT request')
}

module.exports = {
	create,
	retrieveAll,
	retrieveOne,
	deletion,
	change,
}