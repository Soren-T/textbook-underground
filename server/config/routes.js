/**
 * Routes for express app
 */
var express = require('express');
var _ = require('lodash');
var path = require('path');
var postController = require("../controllers/postController");
var authController = require("../controllers/authController");
var isbnController = require("../controllers/isbnController")
var App = require(path.resolve(__dirname, '../../', 'public', 'assets', 'server.js')).default

module.exports = function(app, passport) {
  // app.put('/myRoute', myController.handlerMethod);
  // app.delete('/otherRoute', routeController.handlerMethod);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.post('/api/v1/login', passport.authenticate('local-login', {
        successRedirect : '/api/v1/login/success', // redirect to the secure profile section
        failureRedirect : '/api/v1/login/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

  app.get('/api/v1/users', authController.retrieveUsers);

  app.get('/api/v1/users/:_id', authController.findUser)

  app.put('/api/v1/users/:_id', authController.changeUser)

  app.get('/api/v1/login/:result', function(req, res){
    res.json({success: 'success' === req.params.result, user: req.user})
  });

  app.get('/api/v1/user', function(req, res){
    if(req.isAuthenticated()){
      res.json({user:req.user,loggedIn:true})
    } else {
      res.json({loggedIn: false})
    }
  })

  app.post('/api/v1/logout', authController.logout); 

  app.post('/api/v1/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

	app.post('/api/v1/books', isLoggedIn, postController.create);

	app.get('/api/v1/books', postController.retrieveAll);

  app.get('/api/v1/books/user', isLoggedIn, postController.retrieveBuyerBooks);

  app.get('/api/v1/books/ISBN/:isbn', isbnController.getIsbn);

	app.get('/api/v1/books/:_id', postController.retrieveOne);

	app.delete('/api/v1/books/:_id', isLoggedIn, postController.deletion);

	app.put('/api/v1/books/:_id', isLoggedIn, postController.change);

  app.get('*', function (req, res, next) {
    console.log(App)
    	App(req, res);
  });

};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
      return next();

    res.writeHead(403, {'Content-Type':'text/JSON'})
    res.end(JSON.stringify({message: 'you are not authorized to access this'}))
  }
