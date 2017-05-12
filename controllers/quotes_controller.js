var db = require("../models"); 

var Quotes =  {}

Quotes.getAll = function(callback) {
        db.Quote.findAll({})
            .then(function(dbAllQuotes) {
                callback(dbAllQuotes)
            })
            .catch(function (err) {
                console.log(err);
            });;
};

Quotes.getAll = function(callback) {
    db.Quote.findAll({})
        .then(function(dbAllQuotes) {
            callback(dbAllQuotes)
        })
        .catch(function (err) {
            console.log(err);
        });;
};


Quotes.saveQuoteSelections = function(quoteSelections, callback) {
    db.QuoteSelections.create(quoteSelections)
            .then(function(success) {
                callback({
                    result: "success"
                })
            })
            .catch(function(err) {
                callback({
                    result: "error",
                    message: err.errors[0].message
                });
            });


}

module.exports = Quotes;




