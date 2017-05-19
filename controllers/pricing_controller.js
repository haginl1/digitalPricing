//git test

//global variables
var Pricing = {};
var range = {};
var rate;
var protocolCharge;
var protocols = 0;
var contractTerm,
    setupFee,
    yearOneRange,
    yearTwoRange,
    yearThreeRange, 
    yearOneSupport,
    yearTwoSupport,
    yearThreeSupport,
    yearOneRate,
    yearTwoRate,
    yearThreeRate,
    supportRate;

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

Pricing.calculate = function(quote, protocolRates, streamingRates, supportRates) {
    var yearOneChannels,
        yearTwoChannels,
        yearThreeChannels,
        newChannels1,
        newChannels2,
        newChannels3,
        yearOneAnnual,
        yearTwoAnnual,
        yearThreeAnnual,
        yearOneSetupFee,
        yearTwoSetupFee,
        yearThreeSetupFee,
        yearOneMonthly,
        yearTwoMonthly,
        yearThreeMonthly,
        yearOneAnnual,
        yearTwoAnnual,
        yearThreeAnnual;
    
    //grab contract Term
    contractTerm = parseInt(quote.contract_term);

    switch (contractTerm) {
        case 3:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = parseInt(quote.year_three_channels);
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            yearThreeRange = Pricing.getRateRange(yearThreeChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            yearThreeRate = Pricing.getStreamingRate(contractTerm, yearThreeRange);
            newChannels3 = yearThreeChannels - yearTwoChannels;
            newChannels2 = yearTwoChannels - yearOneChannels;
            newChannels1 = yearOneChannels;
            break;
        case 2:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = 0;
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            newChannels2 = yearTwoChannels - yearOneChannels;
            newChannels1 = yearOneChannels;
            break;
        case 1:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = 0;
            yearThreeChannels = 0;
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            newChannels1 = yearOneChannels;
            break;
        default:
            yearOneChannels = 0;
            yearTwoChannels = 0;
            yearThreeChannels = 0;
            newChannels1 = 0;
            newChannels2 = 0;
            newChannels3 = 0;
            yearOneRange = yearTwoRange = yearThreeRange = 0;
            yearOneRate = yearTwoRate = yearThreeRate = 0;
            break;
    }

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
    yearOneRate += Math.round(yearOneRate * protocolCharge/100);
    yearTwoRate += Math.round(yearTwoRate * protocolCharge/100);
    yearThreeRate += Math.round(yearThreeRate * protocolCharge/100);

    //----------END FUNCTION------------------
    
    switch (contractTerm) {
        case 3:        
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearThreeSupport = Pricing.getSupportFee(quote, supportRates);
            yearThreeSupport = Math.round(yearThreeRate * yearThreeSupport);
            yearOneRate = Math.round(yearOneRate + yearOneSupport);
            yearTwoRate = Math.round(yearTwoRate + yearTwoSupport);
            yearThreeRate = Math.round(yearThreeRate + yearThreeSupport);
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            yearThreeSetupFee = Math.round(Pricing.getSetupFee(newChannels3, yearThreeRate));
            yearOneMonthly = yearOneRate * yearOneChannels;    
            yearTwoMonthly = yearTwoRate * yearTwoChannels;
            yearThreeMonthly = yearThreeRate * yearThreeChannels;
            yearOneAnnual = yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport;
            yearTwoAnnual = yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport;
            yearThreeAnnual = yearThreeMonthly * 12 + yearThreeSetupFee + yearThreeSupport;
            break;
        case 2:       
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearOneRate = Math.round(yearOneRate + yearOneSupport);
            yearTwoRate = Math.round(yearTwoRate + yearTwoSupport);
            yearThreeSupport = 0;
            yearThreeRate = 0;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            yearThreeSetupFee = 0;
            yearOneMonthly = yearOneRate * yearOneChannels;    
            yearTwoMonthly = yearTwoRate * yearTwoChannels;
            yearThreeMonthly = 0;
            yearOneAnnual = yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport;
            yearTwoAnnual = yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport;
            yearThreeAnnual = 0;
            break;
        case 1:
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearOneRate = Math.round(yearOneRate + yearOneSupport);
            yearTwoSupport = 0;
            yearTwoRate = 0;
            yearThreeSupport = 0;
            yearThreeRate = 0;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = 0;
            yearThreeSetupFee = 0;
            yearOneMonthly = yearOneRate * yearOneChannels;    
            yearTwoMonthly = 0; 
            yearThreeMonthly = 0;
            yearOneAnnual = yearOneMonthly * 12;
            yearOneAnnual = yearOneAnnual + yearOneSetupFee + yearOneSupport;
            yearTwoAnnual = 0;
            yearThreeAnnual = 0;
            break;
        default:
            yearOneSupport = yearOneRate = 0;
            yearTwoSupport = yearTwoRate = 0;
            yearThreeSupport = yearThreeRate = 0;
            yearOneSetupFee = yearTwoSetupFee = yearThreeSetupFee = 0;
            yearOneMonthly = yearTwoMonthly = yearThreeMonthly = 0;
            yearOneAnnual = yearTwoAnnual = yearThreeAnnual = 0;
            break;
    }    
    // The streaming rate can be affected in several ways:
    // 1. contract term
    // 2. # of channels
    // 3. # of DRM services 
    //    The first two free.  The third and fourth cost extra.
    // 4. The Service Level Agreement (SLA) 

    //------MAKE A FUNCTION---------------------------
    
//-------------------END FUNCTION------------------------------
    results.year_one_monthly_streaming = yearOneMonthly;
    results.year_two_monthly_streaming = yearTwoMonthly;
    results.year_three_monthly_streaming = yearThreeMonthly;
    results.year_one_setup_fee = yearOneSetupFee;
    results.year_two_setup_fee = yearTwoSetupFee;
    results.year_three_setup_fee = yearThreeSetupFee;
    results.year_one_support_fee = yearOneSupport * yearOneChannels;
    results.year_two_support_fee = yearTwoSupport * yearTwoChannels;
    results.year_three_support_fee = yearThreeSupport * yearThreeChannels;
    results.year_one_annual_fee = yearOneAnnual;
    results.year_two_annual_fee = yearTwoAnnual;
    results.year_three_annual_fee = yearThreeAnnual;

	return results;
    
}

Pricing.getRateRange = function(channelCount, streamingRates) {

    for (var i = 0; i < streamingRates.length; i++) {
        if (channelCount >= streamingRates[i].min_channels && channelCount <= streamingRates[i].max_channels) {
            range = streamingRates[i];
            return range;
        }
    }    
}

Pricing.getStreamingRate = function(contractTerm, range) {
    if (contractTerm === 3) {
        yearThreeRate = range.three_year_rate;
        return yearThreeRate;
    }
    if (contractTerm === 2) {
        yearTwoRate = range.two_year_rate;
        return yearTwoRate;
    }
    if (contractTerm === 1) {
        yearOneRate = range.one_year_rate;
        return yearOneRate;
    }
    else {
    return 0;
    }
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

Pricing.getSupportFee = function(quote, supportRates) {
    var supportPlan = quote.support_plan;
    if (supportPlan === "platinum") {
        supportRate = parseInt(supportRates[1].plan_fee_percent);
        supportRate = supportRate/100;
    }
    else {
        supportRate = parseInt(supportRates[0].plan_fee_percent);
    }
    return supportRate;
}

Pricing.getSetupFee = function(channels, rate){
    setupFee = channels * rate / 2;
    return setupFee;
}

module.exports = Pricing;