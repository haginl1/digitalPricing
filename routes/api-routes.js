"use strict";
var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')

var apiRouter  = express.Router(); 

//add userID to /quotes route?
apiRouter.get("/quotes/:userID", function(req, res) {
    Quotes.getAll(req.params.userID, function callback(allQuotes) {
        //console.log(allQuotes);
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

//need to pass userID to quote body as well
apiRouter.post("/quote/:userID", function(req, res) {
    Quotes.save(req.body, req.params.userID, function callback(result){
        res.send(result)
    })
});

// Export routes for server.js to use.
module.exports = apiRouter;