var db = require("../models"); 

var Errors =  {}

//standard function that handles all DB errors for api routes
Errors.getMessage = function getError(err) {
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

module.exports = Errors;