function login (req, res){
	return res.json({message: "to be implemented"})
}
function logout (req, res){
	req.logout()
	res.json({loggedOut: true})
}

module.exports = {
	login,
	logout,
}