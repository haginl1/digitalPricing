"use strict";

var Quotes     = require('../controllers/quotes_controller.js')

module.exports = function(app){
    app.get("/", function(req, res) {
        Quotes.getAll(function callback(allQuotes) {
            res.render("allQuotes", allQuotes);
        })
    });

    app.get("/result", function(req, res) {
         res.render("result", {});
     });
     app.get("/quote", function(req, res) {
         res.render("quote", {});
     });
}