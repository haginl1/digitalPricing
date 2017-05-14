var db = require("../models"); 

var InitializeDB =  {}

var quoteData = [
        {
            'company':'AMC',
            'description': 'Contract renegotiation 2017',
            'date': '2017-05-12',
            'contract_term':3,
            'year_one_channels': 10,
            'year_two_channels': 15,
            'year_three_channels': 20,
            'HLS': true,
            'HDS': true,
            'MPEG_DASH': false,
            'RTMP': false,
            'support_plan': 'gold',
            'year_one_monthly_streaming': 1000.00,
            'year_two_monthly_streaming': 2000.00,
            'year_three_monthly_streaming': 3000.00,
            'year_one_setup_fee': 100.00,
            'year_two_setup_fee': 200.00,
            'year_three_setup_fee': 300.00,
            'year_one_support_fee': 111.00,
            'year_two_support_fee': 222.00,
            'year_three_support_fee': 333.00
        },
        {
            'company':'NFL Network',
            'description': '2018 Season',
            'date': '2017-05-10',
            'contract_term':1,
            'year_one_channels': 16,
            'year_two_channels': 0,
            'year_three_channels': 0,
            'HLS': true,
            'HDS': true,
            'MPEG_DASH': true,
            'RTMP': true,
            'support_plan': 'platinum',
            'year_one_monthly_streaming': 10000.00,
            'year_two_monthly_streaming': null,
            'year_three_monthly_streaming': null,
            'year_one_setup_fee': 1000.00,
            'year_two_setup_fee': null,
            'year_three_setup_fee': null,
            'year_one_support_fee': 1111.00,
            'year_two_support_fee': null,
            'year_three_support_fee': null
        },
        {
            'company':'HGTV',
            'description': 'Streaming Kickoff',
            'date': '2017-05-08',
            'contract_term':2,
            'year_one_channels': 16,
            'year_two_channels': 22,
            'year_three_channels': 0,
            'HLS': true,
            'HDS': true,
            'MPEG_DASH': true,
            'RTMP': true,
            'support_plan': 'platinum',
            'year_one_monthly_streaming': 1001.00,
            'year_two_monthly_streaming': 2002.00,
            'year_three_monthly_streaming': null,
            'year_one_setup_fee': 101.00,
            'year_two_setup_fee': 202.00,
            'year_three_setup_fee': null,
            'year_one_support_fee': 101.00,
            'year_two_support_fee': 202.00,
            'year_three_support_fee': null
        }
    ];

InitializeDB.quotes = function() {
    console.log("got here")
    db.Quote.destroy({truncate: true})
    db.Quote.bulkCreate(quoteData, { individualHooks: true })
}

module.exports = InitializeDB;




