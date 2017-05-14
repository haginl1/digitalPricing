// this is where I will pull from the db table streaming_rates
// to find the original channel cost depending on on contract length

//will need to check for user input # of channels for each year
//finalQuote = pricing.calculate(quoteSelections, protocolRates, streamingRates, supportRates)

//calculate method

//quotesSelections.fieldname out of models
//protocolRates.xxx
//streamingRates [0], only one row
//supportRates.

//as values are calculated, object will contain those values
var results = {
	year_one_monthly_streaming: 1000.00,
    year_two_monthly_streaming: 2000.00,
    year_three_monthly_streaming: 3000.00,
    year_one_setup_fee: 100.00,
    year_two_setup_fee: 200.00,
    year_three_setup_fee: 300.00,
    year_one_support_fee: 111.00,
    year_two_support_fee: 222.00,
    year_three_support_fee: 333.00 
}

return results;


// var calculate = function() {
// 	console.log(quoteSelections);
// 	console.log(protocolRates);
// 	console.log(streamingRates);
// 	console.log(supportRates);
// }

module.exports = results;