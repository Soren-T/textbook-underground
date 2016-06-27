var isbn = require('node-isbn');

function getIsbn(req, res){
	isbn.resolve(req.params.isbn, function (err, book){
		if (err) {
			console.log('Book not found', err);
		} else {
			console.log('Book found %j', book)
			res.json(book)
		}
	})
}

module.exports ={getIsbn} 