var db = require("../models"); 
var pricing = require("../controllers/pricing_controller.js");
var configData = require("../controllers/configuration_data_controller.js")
var errors = require("../controllers/error_controller.js")


var Quotes =  {}

//gets all of the quotes
Quotes.getAll = function(callback) {
    db.Quote.findAll({})
        .then(function(dbAllQuotes) {
            callback(dbAllQuotes)
        })
        .catch(function (err) {

            callback(errors.getMessage(err));
        });
};

//gets a specific quote
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
            callback(errors.getMessage(err));
        });
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//Saves a full quote
Quotes.save = function(quote, callback) {
    var protocolRates = {}
    var streamingRates = {}
    var supportRates = {}
    quote.date = formatDate(Date.now());
    configData.protocolRatesData(function(result) {
        protocolRates = result;
        configData.streamingRatesData(function(result) {
            streamingRates = result;
            configData.supportRatesData(function(result) {
                supportRates = result;
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
                        callback(errors.getMessage(err));
                    });
            })
        })
    })
}
module.exports = Quotes;
