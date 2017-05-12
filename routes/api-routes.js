var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')

var apiRouter  = express.Router(); 

apiRouter.get("/allquotes", function(req, res) {
    Quotes.getAll(function callback(allQuotes) {
        res.send(allQuotes);
    })
});

apiRouter.get("/quote/:id", function(req, res) {
    Quotes.getOne(req.params.id, function callback(quote) {
        res.send(quote);
    })
});

apiRouter.post("/saveQuoteSelections", function(req, res) {
    Quotes.saveQuoteSelections(req.body, function callback(result){
        res.send(result)
    })
});

// Export routes for server.js to use.
module.exports = apiRouter;