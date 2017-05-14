var db = require("../models"); 
var pricing = require("../controllers/pricing_controller.js");
//temporary to be deleted when getting out of the database
var configData = require("../controllers/initialize_db_controller.js")


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

Quotes.saveQuoteSelections = function(quote, callback) {    
    protocolRates = configData.protocolRatesData()
    streamingRates = configData.streamingRatesData()
    supportRates = configData.supportRatesData()
    var calculations = pricing.calculate(quote, protocolRates, streamingRates, supportRates)
    Object.assign(quote, calculations);
    db.Quote.create(quote)
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




