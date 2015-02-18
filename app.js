var http = require('http'),
  path = require('path'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  consolidate = require('consolidate'),
  swig = require('swig'),
  mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	LocalStrategy = require('passport-local').Strategy;
  routes = require("./server/routes/routes");
  
// Connects to Mongo Database
mongoose.connect('mongodb://localhost/vinix');

// Configures express
app.set('view engine', 'html');
app.engine('.html', consolidate.swig);
app.set('views', __dirname + '/server/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(session({
  secret: 'magnolia dart',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Creates routes for static files
app.use('/css', express.static(__dirname + '/public/assets/css'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Adds routes to the app
routes(app);

// Starts the server
var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});