/**
 * Routes for express app
 */
var express = require('express');
var _ = require('lodash');
var path = require('path');
var postController = require("../controllers/postController");
var authController = require("../controllers/authController");
var isbnController = require("../controllers/isbnController");
var App = require(path.resolve(__dirname, '../../', 'public', 'assets', 'server.js')).default;
var router = express.Router();
var express = require('express');
var router = express.Router();
var mail  = require('sendgrid').mail
var sendgrid = require('sendgrid').SendGrid("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");
var helper = require('sendgrid').mail



module.exports = function(app, passport) {
  // app.put('/myRoute', myController.handlerMethod);
  // app.delete('/otherRoute', routeController.handlerMethod);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  
  //email
  
  router.post('/sendanemail', function(req, res){
    from_email = new helper.Email(req.body.fromEmail)
    to_email = new helper.Email("sorenct04@gmail.com")
    subject = req.body.subject
    content = new helper.Content("text/plain", req.body.content)
    mail = new helper.Mail(from_email, subject, to_email, content)

    var requestBody = mail.toJSON()
    var request = sendgrid.emptyRequest()
    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = requestBody
    sendgrid.API(request, function (response) {
      console.log(response.statusCode)
      res.json(response.body)
      console.log(response.headers)
    })
  });
  //USER routes

  router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/v1/login/success', // redirect to the secure profile section
        failureRedirect : '/api/v1/login/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

  router.get('/users', authController.retrieveUsers);

  router.route('/users/:_id')
      .get(authController.findUser)
      .put(authController.changeUser)
      .delete(authController.userDeletion)

  router.get('/login/:result', function(req, res){
    res.json({success: 'success' === req.params.result, user: req.user})
  });

  router.get('/user', function(req, res){
    if(req.isAuthenticated()){
      res.json({user:req.user,loggedIn:true})
    } else {
      res.json({loggedIn: false})
    }
  })

  router.post('/logout', authController.logout); 

  router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

  //BOOK routes


	router.post('/books', isLoggedIn, postController.create);

	router.get('/books', postController.retrieveAll);

  router.get('/books/user', postController.retrieveBuyerBooks);

  router.get('/books/ISBN/:isbn', isbnController.getIsbn);

	router.get('/books/:_id', postController.retrieveOne);

	router.delete('/books/:_id', isLoggedIn, postController.deletion);

  router.delete('/books/createdBy/:_id', isLoggedIn, postController.deleteByUser)

	router.put('/books/:_id', isLoggedIn, postController.change);

  router.put('/books/createdBy/:_id', postController.hideBook);

  app.use('/api/v1', router)

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
