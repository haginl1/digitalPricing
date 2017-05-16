var db = require("../models"); 
var pricing = require("../controllers/pricing_controller.js");
//temporary to be deleted when getting out of the database
var configData = require("../controllers/initialize_db_controller.js")


var Quotes =  {}

function getError(err) {
    var error = {}
    error.result = 'error'
    error.messages = []
    if (err.errors) {
        err.errors.forEach(function(element) {
            error.messages.push(element.message)
        }, this);
    }
    else {
        error.messages = ["undefined error"]
    }
    return error
}


Quotes.getAll = function(callback) {
    db.Quote.findAll({})
        .then(function(dbAllQuotes) {
            callback(dbAllQuotes)
        })
        .catch(function (err) {
            callback(getError(err));
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
            callback(getError(err));
        });
};

Quotes.saveQuoteSelections = function(quote, callback) {    
    protocolRates = configData.protocolRatesData()
    streamingRates = configData.streamingRatesData()
    supportRates = configData.supportRatesData()
    var calculations = pricing.calculate(quote, protocolRates, streamingRates, supportRates)
    Object.assign(quote, calculations);
    db.Quote.create(quote)
        .then(function(quote) {
            callback({
                result: 'success',
                quote: quote
            })
        })
        .catch(function(err) {
            callback(getError(err));
        });
}

module.exports = Quotes;