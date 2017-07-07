
var Pricing = {};
var range = {};
var protocols = 0;
var contractTerm = 0,
    rate = 0,
    protocolCharge = 0,
    setupFee = 0,
    yearOneRange = 0,
    yearTwoRange = 0,
    yearThreeRange = 0, 
    yearOneSupport = 0,
    yearTwoSupport = 0,
    yearThreeSupport = 0,
    yearOneRate = 0,
    yearTwoRate = 0,
    yearThreeRate = 0,
    supportRate = 0;

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
    var yearOneChannels = 0,
        yearTwoChannels = 0,
        yearThreeChannels = 0,
        newChannels1 = 0,
        newChannels2 = 0,
        newChannels3 = 0,
        yearOneAnnual = 0,
        yearTwoAnnual = 0,
        yearThreeAnnual = 0,
        yearOneSetupFee = 0,
        yearTwoSetupFee = 0,
        yearThreeSetupFee = 0,
        yearOneMonthly = 0,
        yearTwoMonthly = 0,
        yearThreeMonthly = 0,
        yearOneAnnual = 0,
        yearTwoAnnual = 0,
        yearThreeAnnual = 0,
        protocols = 0;

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
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            newChannels2 = yearTwoChannels - yearOneChannels;
            newChannels1 = yearOneChannels;
            break;
        case 1:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            newChannels1 = yearOneChannels;
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

    protocolCharge = protocolRates[0].additional_protocol_rate_percent;
   
    if (protocols == 4) {
        protocolCharge = protocolCharge * 2;
    }
    if (protocols < 3) {
        protocolCharge = 0;
    }
    yearOneRate += yearOneRate * protocolCharge/100;
    yearTwoRate += yearTwoRate * protocolCharge/100;
    yearThreeRate += yearThreeRate * protocolCharge/100;

    switch (contractTerm) {
        case 3:        
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearThreeSupport = Pricing.getSupportFee(quote, supportRates);
            yearThreeSupport = Math.round(yearThreeRate * yearThreeSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearTwoRate = yearTwoRate + yearTwoSupport;
            yearThreeRate = yearThreeRate + yearThreeSupport;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            yearThreeSetupFee = Math.round(Pricing.getSetupFee(newChannels3, yearThreeRate));
            yearOneMonthly = Math.round(yearOneRate * yearOneChannels);    
            yearTwoMonthly = Math.round(yearTwoRate * yearTwoChannels);
            yearThreeMonthly = Math.round(yearThreeRate * yearThreeChannels);
            yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            yearTwoAnnual = Math.round(yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport);
            yearThreeAnnual = Math.round(yearThreeMonthly * 12 + yearThreeSetupFee + yearThreeSupport);
            break;
        case 2:       
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearTwoRate = yearTwoRate + yearTwoSupport;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            yearOneMonthly = Math.round(yearOneRate * yearOneChannels);    
            yearTwoMonthly = Math.round(yearTwoRate * yearTwoChannels);
            yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            yearTwoAnnual = Math.round(yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport);
            break;
        case 1:
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearOneMonthly = Math.round(yearOneRate * yearOneChannels)    
            yearOneAnnual = yearOneMonthly * 12;
            yearOneAnnual = Math.round(yearOneAnnual + yearOneSetupFee + yearOneSupport);
            break;
    }    
    
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
        if (!yearThreeRate) {
            return 0;
        }
        return yearThreeRate;
    }
    if (contractTerm === 2) {
        yearTwoRate = range.two_year_rate;
        if (!yearTwoRate) {
            return 0;
        }
        return yearTwoRate;
    }
    if (contractTerm === 1) {
        yearOneRate = range.one_year_rate;
        if (!yearOneRate) {
            return 0;
        }
        return yearOneRate;
    }
    else {
    return 0;
    }
}

Pricing.getSupportFee = function(quote, supportRates) {
    var supportPlan = quote.support_plan;
    if (supportPlan === "platinum" || supportPlan === "Platinum") {
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