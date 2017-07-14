"use strict";
var express = require('express');
var cors = require('cors')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var db = require('./models');
var InitializeDB = require('./controllers/initialize_db_controller.js')
var path = require("path");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://heroku_hftl0rtv:4jllh9tjqho971tvv0kcb998q6@ds163721.mlab.com:63721/heroku_hftl0rtv");
// mongoose.connect("mongodb://localhost/quote-builder");

var mongoDB = mongoose.connection;
var users = require('./routes/users');
var api = require("./routes/api-routes.js");
var app = express();
var port = process.env.PORT || 8080;
var dbStartupArguments = {};

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(methodOverride('_method'));

var api = require("./routes/api-routes.js");

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

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

app.use(flash());
app.use('/users',users);
app.use("/api", api);

app.use(function(req,res,next){
    res.locals.success_msg =req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user = req.user || null;
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