var express = require('express');
var fs = require('fs');
var secrets = require('./config/secrets');
var webpack = require('webpack');
var app = express();
var mongoose = require('mongoose');
var passport = require ('passport');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_58qxs6t9:9bodov76i3011t3t9c8j7utnv3@ds021034.mlab.com:21034/heroku_58qxs6t9');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

	// Bootstrap models
	fs.readdirSync(__dirname + '/models').forEach(function(file) {
		if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
	});

	var isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		var config = require('../webpack/webpack.config.dev-client.js');
		var compiler = webpack(config);

		app.use(require('webpack-dev-middleware')(compiler, {
			noInfo: true,
			publicPath: config.output.publicPath
		}));

		app.use(require('webpack-hot-middleware')(compiler));
	}

	require('./config/passport')(passport);

	// Bootstrap application settings
	require('./config/express')(app, passport);

	// Bootstrap routes
	require('./config/routes')(app, passport);

	app.listen(app.get('port'));

})

