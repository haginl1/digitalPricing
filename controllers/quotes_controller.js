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

Quotes.getOne = function(id, callback) {
    result = {
            id: 1,
            company: "AMC",
            description: "Best quote ever",
            date: "2017-01-12",
            contract_term: 3,
            year_one_channels: 10,
            year_two_channels: 20,
            year_three_channels: 30,
            HLS: true,
            HDS: true,
            MPEG_DASH: false,
            RTMP: false,
            support_plan: "Gold",
            year_one_monthly_streaming: 1000.00,
            year_two_monthly_streaming: 2000.00,
            year_three_monthly_streaming: 3000.00,
            year_one_setup_fee: 150.00,
            year_two_setup_fee: 250.00,
            year_three_setup_fee: 350.00,
            year_one_support_fee: 801.00,
            year_two_support_fee: 802.00,
            year_two_support_fee: 803.00
        }
    callback(result);
};

    // db.QuotePrices.findOne({
    //   where: {
    //     id: id
    //   }
    // })
    // .then(function(dbPost) {
    //   res.json(dbPost);
    // });




Quotes.saveQuoteSelections = function(quoteSelections, callback) {
    db.QuoteSelections.create(quoteSelections)
            .then(function(success) {
                //call Trent here
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




