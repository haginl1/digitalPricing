var db = require("../models"); 

var InitializeDB =  {}

var quoteData = [
    {
        'userID':'4',
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
        'year_three_support_fee': 333.00,
        'year_one_annual_fee': 1111.00,
        'year_two_annual_fee': 2222.00,
        'year_three_annual_fee': 3333.00
    },
    {
        'userID':'90',
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
        'year_three_support_fee': null,
        'year_one_annual_fee': 1111.00,
        'year_two_annual_fee': null,
        'year_three_annual_fee': null
    },
    {
        'userID':'110',
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
        'year_three_support_fee': null,
        'year_one_annual_fee': 1111.00,
        'year_two_annual_fee': 2222.00,
        'year_three_annual_fee': null
    }
];

InitializeDB.quotes = function() {
    db.Quote.destroy({truncate: true})
    db.Quote.bulkCreate(quoteData, { individualHooks: true })
}

InitializeDB.protocolRatesData = function() {
    return(
        [
            {
                'included_protocol_count': 2,
                'additional_protocol_rate_percent': 10
            }
        ]
    )
}

InitializeDB.protocolRates = function() {
    db.ProtocolRates.destroy({truncate: true})
    db.ProtocolRates.bulkCreate(InitializeDB.protocolRatesData(), { individualHooks: true })
}

InitializeDB.streamingRatesData = function() {
    return(
        [
            {
                'min_channels': 1,
                'max_channels': 1,
                'one_year_rate': 950,
                'two_year_rate': 925,
                'three_year_rate': 875,
                'setup_fee_percent': 50
            },
            {
                'min_channels': 2,
                'max_channels': 25,
                'one_year_rate': 931,
                'two_year_rate': 907,
                'three_year_rate': 858,
                'setup_fee_percent': 50
            },
                {
                'min_channels': 26,
                'max_channels': 50,
                'one_year_rate': 903,
                'two_year_rate': 879,
                'three_year_rate': 831,
                'setup_fee_percent': 50
            },
                {
                'min_channels': 51,
                'max_channels': 100,
                'one_year_rate': 855,
                'two_year_rate': 833,
                'three_year_rate': 788,
                'setup_fee_percent': 50
            },    {
                'min_channels': 101,
                'max_channels': 150,
                'one_year_rate': 808,
                'two_year_rate': 786,
                'three_year_rate': 744,
                'setup_fee_percent': 50
            },    {
                'min_channels': 151,
                'max_channels': 10000,
                'one_year_rate': 760,
                'two_year_rate': 740,
                'three_year_rate': 700,
                'setup_fee_percent': 50
            }
        ]
    )
}

InitializeDB.streamingRates = function() {
    db.StreamingRates.destroy({truncate: true})
    db.StreamingRates.bulkCreate(InitializeDB.streamingRatesData(), { individualHooks: true })
}

InitializeDB.supportRatesData = function() {
    return(
        [
            {
                'plan': 'gold',
                'plan_fee_percent': 0.0
            },
            {
                'plan': 'platinum',
                'plan_fee_percent': 10.0
            }
        ]
    )
}

InitializeDB.supportRates = function() {
    db.SupportRates.destroy({truncate: true})
    db.SupportRates.bulkCreate(InitializeDB.supportRatesData(), { individualHooks: true })
}

module.exports = InitializeDB;




