//--------HARD CODED VALUES FOR TESTING IN PLACE----------------------

//global variables
var Pricing = {};
var range = {};
var rate;
var protocolCharge;
var protocols = 0;
var contractTerm;
var setupFee;
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
    year_three_support_fee: 0,
    year_one_annual_fee: 0, 
    year_two_annual_fee: 0,
    year_three_annual_fee: 0
}

//
Pricing.calculate = function(quote, protocolRates, streamingRates, supportRates) {
    var yearOneChannels,
        yearTwoChannels,
        yearThreeChannels,
        newChannels1,
        newChannels2,
        newChannels3,
        yearOneAnnual,
        yearTwoAnnual,
        yearThreeAnnual;

 //grab contract Term
    contractTerm = parseInt(quote.contract_term);
    contractTerm = 3;
    console.log("CONTRACT TERM   " + contractTerm);

    //determine which row of the streaming rates table to consider
    Pricing.getRateRange(contractTerm, channels, streamingRates);

    //determine the appropriate streaming rate depending on contract term
    Pricing.getStreamingRate(contractTerm, range);
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
    console.log("++++++" +  protocols);
    
    //grab the protocol upcharge % to apply to rate
    protocolCharge = protocolRates[0].additional_protocol_rate_percent;
   
    //calculate drm upcharge %
    //getDrmFee(protocols, protocolCharge);
    //-------MAKE A FUNCTION ---------------
    if (protocols == 4) {
        protocolCharge = protocolCharge * 2;
    }
    if (protocols < 3) {
        protocolCharge = 0;
    }
    var drmFee = rate * protocolCharge/100;
    //----------END FUNCTION------------------


    var supportFee = Pricing.getSupportFee(rate, quote, supportRates);
    supportFee = Math.round(rate * supportFee);
    console.log("support fee " + supportFee);
    // The streaming rate can be affected in several ways:
    // 1. contract term
    // 2. # of channels
    // 3. # of DRM services 
    //    The first two free.  The third and fourth cost extra.
    // 4. The Service Level Agreement (SLA) 
    rate = Math.round(rate + drmFee + supportFee);
    console.log("rate " + rate);

    
    //error handling for zero/undef/NaN values that may come
    //from the table
    //if THIS or THAT, return 0;


    //------MAKE A FUNCTION---------------------------
    switch (contractTerm) {
        case 3:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = parseInt(quote.year_three_channels);
            break;
        case 2:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = 0;
            break;
        case 1:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = 0;
            yearThreeChannels = 0;
            break;
        default:
            yearOneChannels = 0;
            yearTwoChannels = 0;
            yearThreeChannels = 0;
            newChannels1 = 0;
            newChannels2 = 0;
            newChannels3 = 0;
    }
    
    console.log("Y1 CH " + yearOneChannels);
    console.log("Y2 CH " + yearTwoChannels);
    console.log("Y3 CH " + yearThreeChannels);

    newChannels1 = yearOneChannels;

    if (contractTerm === 3) {
        newChannels2 = yearTwoChannels - yearOneChannels;
        if (newChannels2 > 0) {
            newChannels2 = newChannels2;
        }
        else { 
            newChannels2 = 0;
        }
        newChannels3 = yearThreeChannels - yearTwoChannels;
        if (newChannels3 > 0) {
           newChannels3 = newChannels3;
        }
        else {
            newChannels3 = 0;
        }
    }

    console.log("Y1 NEW " + newChannels1);
    console.log("Y2 NEW " + newChannels2);
    console.log("Y3 NEW " + newChannels3);

    var yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, rate));
    var yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, rate));
    var yearThreeSetupFee = Math.round(Pricing.getSetupFee(newChannels3, rate));

    console.log("Y1 SF " + yearOneSetupFee);
    console.log("Y2 SF " + yearTwoSetupFee);
    console.log("Y3 SF " + yearThreeSetupFee);

    var yearOneMonthly = rate * yearOneChannels;
        //yearOneMonthly += supportFee + setupFee;
    var yearTwoMonthly = rate * yearTwoChannels;
      //  yearTwoMonthly += supportFee + setupFee;
    var yearThreeMonthly = rate * yearThreeChannels;
       // yearThreeMonthly += supportFee + setupFee;
    yearOneAnnual = yearOneMonthly * 12 + yearOneSetupFee + supportFee;
    yearTwoAnnual = yearTwoMonthly * 12 + yearTwoSetupFee + supportFee;
    yearThreeAnnual = yearThreeMonthly * 12 + yearThreeSetupFee + supportFee;
    console.log("Y1 ANNUAL: " + yearOneAnnual);
    console.log("Y2 ANNUAL: " + yearTwoAnnual);
    console.log("Y3 ANNUAL: " + yearThreeAnnual);
//-------------------END FUNCTION------------------------------
    results.year_one_monthly_streaming = yearOneMonthly;
    results.year_two_monthly_streaming = yearTwoMonthly;
    results.year_three_monthly_streaming = yearThreeMonthly;
    results.year_one_setup_fee = yearOneSetupFee;
    results.year_two_setup_fee = yearTwoSetupFee;
    results.year_three_setup_fee = yearThreeSetupFee;
    results.year_one_support_fee = supportFee * yearOneChannels;
    results.year_two_support_fee = supportFee * yearTwoChannels;
    results.year_three_support_fee = supportFee * yearThreeChannels;
    results.year_one_annual_fee = yearOneAnnual;
    results.year_two_annual_fee = yearTwoAnnual;
    results.year_three_annual_fee = yearThreeAnnual;

	return results;
    
}

Pricing.getRateRange = function(contractTerm, channelCount, streamingRates) {

    for (var i = 0; i < streamingRates.length; i++) {
        if (channelCount >= streamingRates[i].min_channels && channelCount <= streamingRates[i].max_channels) {
            range = streamingRates[i];
            return range;
        }
    }    
}

Pricing.getStreamingRate = function(contractTerm, range) {
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

Pricing.getDrmFee = function(protocols, protocolCharge) {
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

Pricing.getSupportFee = function(rate, quote, supportRates) {
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

Pricing.getSetupFee = function(channels){
    setupFee = channels * rate / 2;
    return setupFee;
}

module.exports = Pricing;
