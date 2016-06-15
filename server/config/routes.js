/**
 * Routes for express app
 */
var express = require('express');
var _ = require('lodash');
var path = require('path');
var postController = require("../controllers/postController")


var App = require(path.resolve(__dirname, '../../', 'public', 'assets', 'server.js'))['default'];

module.exports = function(app) {
  // app.put('/myRoute', myController.handlerMethod);
  // app.delete('/otherRoute', routeController.handlerMethod);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  
	app.post('/api/v1/posts', postController.create)

	app.get('/api/v1/posts', postController.retrieveAll)

	app.get('/api/v1/posts/:slug', postController.retrieveOne)

	app.delete('/api/v1/posts/:slug', postController.deletion)

	app.put('/api/v1/posts/:slug', postController.change)



  	app.get('*', function (req, res, next) {
    	App(req, res);
  });

};
