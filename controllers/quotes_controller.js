var db = require("../models"); 
var pricing = require("../controllers/pricing_controller.js");
var configData = require("../controllers/configuration_data_controller.js")
var errors = require("../controllers/error_controller.js")


var Quotes =  {}

// on add quote, pass in userID

//gets all of the quotes
Quotes.getAll = function(userID, callback) {
    db.Quote.findAll({
        where: {
            userID: userID
        }
    })
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
Quotes.save = function(quote, userID, callback) {
    var protocolRates = {}
    var streamingRates = {}
    var supportRates = {}
    quote.date = formatDate(Date.now());
    quote.userID = userID;
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

Quotes.validate = function(req) {
            if (typeof(req.body.year_one_channels) === "undefined") {
            req.body.year_one_channels = 0
        }
        if (typeof(req.body.year_two_channels) === "undefined") {
            req.body.year_two_channels = 0
        }
        if (typeof(req.body.year_three_channels) === "undefined") {
            req.body.year_three_channels = 0
        }
        if (req.body.year_one_channels.length === 0) {
            req.body.year_one_channels = 0
        }
        if (req.body.year_two_channels.length === 0) {
            req.body.year_two_channels = 0
        }
        if (req.body.year_three_channels.length === 0) {
            req.body.year_three_channels = 0
        }
        if (typeof(req.body.HLS) === "undefined") {
            req.body.HLS = 0
        }
        if (typeof(req.body.HDS) === "undefined") {
            req.body.HDS = 0
        }
        if (typeof(req.body.RTMP) === "undefined") {
            req.body.RTMP = 0
        }
        if (typeof(req.body.MPEG_DASH) === "undefined") {
            req.body.MPEG_DASH = 0
        }
        return req
}
module.exports = Quotes;
