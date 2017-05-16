"use strict";
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');
var InitializeDB = require('./controllers/initialize_db_controller.js')


// set up server
var app = express();
var port = process.env.PORT || 8080;

var dbStartupArguments = {};

// set up handlebars engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Import routes and give the server access to them.
var api = require("./routes/api-routes.js");
var html = require("./routes/html-routes.js")(app);


app.use("/api", api);
//app.use("/", html);


//check if in INIT mode
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