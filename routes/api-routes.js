"use strict";
var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')

var apiRouter  = express.Router(); 

apiRouter.get("/quotes", function(req, res) {
    Quotes.getAll(function callback(allQuotes) {
        res.send(allQuotes);
    })
});

apiRouter.get("/quote/:id", function(req, res) {
    Quotes.getOne(req.params.id, function callback(quote) {
        if (quote.length === 0) {
            res.status(404).send({
                result: "error",
                message: "Quote not found"                
            })
        }   
        else {
            res.send(quote);
        }
    })
});

apiRouter.post("/quote", function(req, res) {
    Quotes.save(req.body, function callback(result){
        res.send(result)
    })
});

// Export routes for server.js to use.
module.exports = apiRouter;