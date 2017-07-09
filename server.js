"use strict";
var express = require('express');
var cors = require('cors')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');
var InitializeDB = require('./controllers/initialize_db_controller.js')
//login app added packages:
var path= require("path");
var cookieParser=require("cookie-parser");
var expressValidator=require("express-validator");
var flash=require("connect-flash");
var session=require("express-session");
var passport= require("passport");
var LocalStrategy=require("passport-local").Strategy;
var mongo=require("mongodb");
var mongoose=require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://heroku_hftl0rtv:4jllh9tjqho971tvv0kcb998q6@ds163721.mlab.com:63721/heroku_hftl0rtv");
//mongoose.connect("mongodb://localhost/loginapp");
var mongoDB=mongoose.connection;

//var routes= require('./routes/index');
var users= require('./routes/users');
var api = require("./routes/api-routes.js");
//var html = require("./routes/html-routes.js");

// set up server
var app = express();
var port = process.env.PORT || 8080;

var dbStartupArguments = {};

// // set up handlebars engine
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.raw());


app.use(cookieParser());
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Import routes and give the server access to them.
var api = require("./routes/api-routes.js");
// var html = require("./routes/html-routes.js")(app);


//app.use("/api", api);
//app.use("/", html);

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//cors init
app.use(cors())


//Express Validator
// In this example, the formParam value is going to get morphed into form body format useful for printing. 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect flash
app.use(flash());
  

//app.use('/',routes);
app.use('/users',users);
app.use("/api", api);
//app.use("/", html);

//Global Vars
app.use(function(req,res,next){
    res.locals.success_msg =req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user = req.user || null;
  // res.locals.user = req.user._id || null;
  // console.log('server '+res.locals.user);
    next();
});


//check if in INIT mode to load the database
 process.argv[2] === "init"
 if (process.argv[2] === "init") {
	dbStartupArguments = dbStartupArguments.force = true
	db.sequelize.sync({dbStartupArguments}).then(function() {
		app.listen(port, function() {
		console.log('listening on ' + port);
		console.log('initializing db')
		InitializeDB.quotes()
		InitializeDB.protocolRates()
		InitializeDB.streamingRates()
		InitializeDB.supportRates()

		});
	})
}
else {
	db.sequelize.sync({})
	.then(function() {
		app.listen(port, function() {
		console.log('listening on ' + port);
		});
	})
}
