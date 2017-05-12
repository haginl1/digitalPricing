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


module.exports = Quotes;




