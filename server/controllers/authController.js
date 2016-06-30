var User = require("../models/userModel")

function login (req, res){
	return res.json({message: "to be implemented"})
}
function logout (req, res){
	req.logout()
	res.json({loggedOut: true})
}

function retrieveUsers (req, res){
	User.find(function (err, user) {
			if (err) return console.error(err);
			console.log(user);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(user))
		})
}
function findUser (req, res){
	User.findOne({
		_id: req.params._id
	}, function (err, user) {
			if (err) return console.error(err);
			console.log(user);
			console.log('recieved a GET request')
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify(user))
		})
}
function changeUser(req, res){
	var query = {_id: req.params._id};
	console.log('Req.body', req.body)
	User.findOneAndUpdate(query, {$set: req.body}, 
	function (err, returnValue) {
		if (err) return console.error(err);
		console.log(returnValue)
		res.writeHead(200, {'Content-Type': 'text/JSON'})
		res.end(JSON.stringify({success: true}))
	})
	console.log('recieved a PUT request')
}
function userDeletion(req, res){
	User.remove({
		_id: req.params._id,
		}, 
		function (err, returnValue) {
			if (err) return console.error(err);
			console.log(returnValue)
			res.writeHead(200, {'Content-Type': 'text/JSON'})
			res.end(JSON.stringify({success: true}))
		});
		console.log('recieved a DELETE request')
}

module.exports = {
	login,
	logout,
	retrieveUsers,
	changeUser,
	findUser,
	userDeletion,
}