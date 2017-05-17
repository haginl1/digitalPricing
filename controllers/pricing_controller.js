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
// var calculator = require('../public/assets/js/calc.js');

var Pricing = {};
var range = {};
var rate;

var year = 3;
var channels = 26;

var results = {
	year_one_monthly_streaming: 0,
    year_two_monthly_streaming: 0,
    year_three_monthly_streaming: 0,
    year_one_setup_fee: 0,
    year_two_setup_fee: 0,
    year_three_setup_fee: 0,
    year_one_support_fee: 0,
    year_two_support_fee: 0,
    year_three_support_fee: 0 
}

Pricing.calculate = function(quote, protocolRates, streamingRates, supportRates) {
	// var newChannels1;
 //    var newChannels2;
 //    var newChannels3;
 //    var grandTotalyear1 = 0;
 //    var grandTotalyear2 = 0;
 //    var grandTotalyear3 = 0;
 //    var grandTotal;
 //    var channelCost;
 //    var supportFee = 0;
 //    var setupFee;
 //    var channelRate;
    var protocols = 0;
    if (quote.HLS === "true") {
        protocols += 1;
        }
    if (quote.HDS === "true") {
        protocols += 1;
        }
    if (quote.MPEG_DASH === "true") {
        protocols += 1;
        }
    if (quote.RTMP === "true") {
        protocols += 1;
        }
    getDrmFee(protocols);
 //    console.log("protocol count: " + protocolCount);
 //    var protocolCharge = protocolRates[0].additional_protocol_rate_percent / 100;
 //    console.log("protocol upcharge: " + protocolCharge);
 //    var contractTerm = quote.contract_term;
 //    console.log("contract term: " + contractTerm);
 //    var yearOneChannels = quote.year_one_channels;
 //    var yearTwoChannels = quote.year_two_channels;
 //    var yearThreeChannels = quote.year_three_channels;
 //    console.log("Year one/two/three: " + yearOneChannels + " | " + yearTwoChannels + " | " + yearThreeChannels);
 //    var supportRate = supportRates[0].plan_fee_percent;
 //    console.log("Support Rate: " + supportRate);

 //    newChannels1 = yearOneChannels;

 //    if (contractTerm === 3) {
 //        newChannels2 = yearTwoChannels - yearOneChannels;
 //        channelRate = getStreamingRate(contractTerm, );
 //        if (newChannels2 > 0) {
 //            newChannels2 = newChannels2;
 //        }
 //        else { 
 //            newChannels2 = 0;
 //        }
 //        newChannels3 = yearThreeChannels - yearTwoChannels;
 //        if (newChannels3 > 0) {
 //           newChannels3 = newChannels3;
 //        }
 //        else {
 //            newChannels3 = 0;
 //        }
 //    }

 //    if (contractTerm === 3) {
 //        if (year)

 //    }
 //    if 
    
 //    console.log(streamingRates[5]);
	// // console.log("CONTRACT TERM HERE +++++++++++++ " + x);
 //    // console.log(protocolRates[0]);
	// // console.log(protocolRates);
	// // console.log(streamingRates);
	// // console.log(supportRates);
    // results.year_one_monthly_streaming = calculateTotal(newChannels1, drm, supportRate) / 12;
    getRateRange(year, channels, streamingRates);
    getStreamingRate(year, range);
    console.log(rate);
 //    function calculateTotal(newChannels, drm, support){
 //        var drmFee = channelRate * protocolCharge;
 //        drmFee = Math.round(drmFee);

 //        channelRate += drmFee;
 //    }
	return results;
}

function getRateRange(contractTerm, channelCount, streamingRates) {

    for (var i = 0; i < streamingRates.length; i++) {
        if (channelCount >= streamingRates[i].min_channels && channelCount <= streamingRates[i].max_channels) {
            range = streamingRates[i];
            return range;
        }
    } 
    

}

function getStreamingRate(contractTerm, range) {
    if (contractTerm === 3) {
        rate = range.three_year_rate;
    }
    if (contractTerm === 2) {
        rate = range.two_year_rate;
    }
    if (contractTerm === 1) {
        rate = range.one_year_rate;
    }
    return rate;
}

function getDrmFee(protocols, protocolRates) {
    var (protocols > 2) {


    }
}
// Pricing.getStreamingRate = function(channelCount, contractTerm, streamingRates) {
    
// }

module.exports = Pricing;