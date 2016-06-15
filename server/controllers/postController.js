var Post = require("../models/postModels")

function create(req, res){
	var newPost = new Post({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		slug: req.body.slug,
	})
	newPost.save(function (err, post) {
		if (err) return console.error(err);
		res.writeHead(200, {'Content-Type': 'text/JSON'})
		res.end(JSON.stringify(post))
	});
}
function retrieveAll(req, res){
	Post.find(function (err, post) {
			if (err) return console.error(err);
			console.log(post);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(post))
		})
}
//get post:slug
function retrieveOne(req, res){
	Post.find(function (err, post) {
			if (err) return console.error(err);
			console.log(post);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(post))
		})
}
function deletion(req, res){
	Post.remove({
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
		Post.findOneAndUpdate(query, { 
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