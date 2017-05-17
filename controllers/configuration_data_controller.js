var db = require("../models"); 
var errors = require("../controllers/error_controller.js")


var Config =  {}

//gets all of the quotes
Config.protocolRatesData = function(callback) {
    db.ProtocolRates.findAll({})
        .then(function(protocolRates) {
            callback(protocolRates)
        })
        .catch(function (err) {
            callback(errors.getMessage(err));
        });
};

Config.streamingRatesData = function(callback) {
    db.StreamingRates.findAll({})
        .then(function(streamingRates) {
            callback(streamingRates)
        })
        .catch(function (err) {
            callback(errors.getMessage(err));
        });
};

Config.supportRatesData = function(callback) {
    db.SupportRates.findAll({})
        .then(function(supportRates) {
            callback(supportRates)
        })
        .catch(function (err) {
            callback(errors.getMessage(err));
        });
};

module.exports = Config;
