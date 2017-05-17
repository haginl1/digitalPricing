// var calculator = require('../public/assets/js/calc.js');

//global variables
var Pricing = {};
var range = {};
var rate;
var protocolCharge;
var protocols = 0;

//preset values for testing
var year = 3;
var channels = 26;

//results object to send back to Les
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

//
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
    var contractTerm = parseInt(quote.contract_term);
    console.log("CONTRACT TERM   " + contractTerm);
    getRateRange(contractTerm, channels, streamingRates);
    getStreamingRate(contractTerm, range);
    console.log("INITIAL RATE" + rate);
    console.log("rate before protocols " + rate);
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
    //testing protocols value
    protocols = 4;
    console.log("++++++" +  protocols);
    
    protocolCharge = protocolRates[0].additional_protocol_rate_percent;
    if (protocols == 4) {
        protocolCharge = protocolCharge * 2;
    }
    if (protocols < 3) {
        protocolCharge = 0;
    }
    // these are working
    // need to calculate setup fees
    getDrmFee(protocols, protocolCharge);
    var drmFee = rate * protocolCharge/100;
    var supportFee = getSupportFee(rate, quote, supportRates);
    supportFee = rate * supportFee;
    console.log("support fee " + supportFee);
    rate = Math.round(rate + drmFee + supportFee);
    console.log("rate " + rate);

    var yearOneChannels = parseInt(quote.year_one_channels);
    var yearTwoChannels = parseInt(quote.year_two_channels);
    var yearThreeChannels = parseInt(quote.year_three_channels);

    var yearOneMonthly = rate * yearOneChannels;
        //yearOneMonthly += supportFee + setupFee;
    var yearTwoMonthly = rate * yearTwoChannels;
      //  yearTwoMonthly += supportFee + setupFee;
    var yearThreeMonthly = rate * yearThreeChannels;
       // yearThreeMonthly += supportFee + setupFee;

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
    // results.year_one_monthly_streaming = calculateTotal(newChannels1, drm, supportRate) / 12;
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

function getDrmFee(protocols, protocolCharge) {
    // console.log("protocols: xxxxx" + protocols);
    // console.log(typeof protocols);
    // console.log("protocol charge " + typeof protocolCharge);
    // if (protocols === 4) {
    //     protocolCharge = protocolCharge * 2;
    // }
    // if (protocols < 3) {
    //     protocolCharge = 0;
    // }
    //  return protocolCharge;
}

function getSupportFee(rate, quote, supportRates) {
    var supportPlan = quote.support_plan;
    var supportRate;
    if (supportPlan === "platinum") {
        supportRate = parseInt(supportRates[1].plan_fee_percent);
        supportRate = supportRate/100;
    }
    else {
        supportRate = parseInt(supportRates[0].plan_fee_percent);
    }
    return supportRate;
}

module.exports = Pricing;