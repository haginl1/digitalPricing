var db = require("../models"); 

var Quotes =  {}

Quotes.getAll = function(callback) {
    db.Quote.findAll({})
        .then(function(dbAllQuotes) {
            callback(dbAllQuotes)
        })
        .catch(function (err) {
            callback({
                result: "error",
                message: err.errors[0].message
            });
        });
};

Quotes.getOne = function(id, callback) {
    db.Quote.findOne({
        where: {
            id: id
        }
    })
        .then(function(dbAllQuotes) {
            callback(dbAllQuotes)
        })
        .catch(function (err) {
            callback([]);
        });
};

Quotes.saveQuoteSelections = function(quoteSelections, callback) {
    //call Trent here
    //quoteSelections = getPrices(quoteselections)
    db.Quote.create(quoteSelections)
        .then(function(success) {
            callback({
                result: success
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




