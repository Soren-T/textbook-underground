var isbn = require('node-isbn');

function getIsbn(req, res){
	isbn.resolve(req.params.isbn, function (err, book){
		if (err) {
			console.log('Book not found', err);
			res.json({found: false})
		} else {
			console.log('Book found %j')
			res.json(book)
		}
	})
}

module.exports ={getIsbn} 