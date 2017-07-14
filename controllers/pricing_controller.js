var Pricing = {};

Pricing.calculate = function(quote, protocolRates, streamingRates, supportRates) {
    
    var contractTerm = parseInt(quote.contract_term);
    var protocolCharge = protocolRates[0].additional_protocol_rate_percent;
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
    if (protocols == 4) {
        protocolCharge = protocolCharge * 2;
    }
    if (protocols < 3) {
        protocolCharge = 0;
    }

    switch (contractTerm) {
        case 3:
            var yearOneChannels = parseInt(quote.year_one_channels);
            var yearTwoChannels = parseInt(quote.year_two_channels);
            var yearThreeChannels = parseInt(quote.year_three_channels);
            var yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            var yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            var yearThreeRange = Pricing.getRateRange(yearThreeChannels, streamingRates);
            var yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            var yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            var yearThreeRate = Pricing.getStreamingRate(contractTerm, yearThreeRange);
            yearOneRate += yearOneRate * protocolCharge/100;
            yearTwoRate += yearTwoRate * protocolCharge/100;
            yearThreeRate += yearThreeRate * protocolCharge/100;
            var newChannels3 = yearThreeChannels - yearTwoChannels;
            var newChannels2 = yearTwoChannels - yearOneChannels;
            var newChannels1 = yearOneChannels;
            var yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            var yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            var yearThreeSupport = Pricing.getSupportFee(quote, supportRates);
            yearThreeSupport = Math.round(yearThreeRate * yearThreeSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearTwoRate = yearTwoRate + yearTwoSupport;
            yearThreeRate = yearThreeRate + yearThreeSupport;
            var yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            var yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            var yearThreeSetupFee = Math.round(Pricing.getSetupFee(newChannels3, yearThreeRate));
            var yearOneMonthly = Math.round(yearOneRate * yearOneChannels);
            var yearTwoMonthly = Math.round(yearTwoRate * yearTwoChannels);
            var yearThreeMonthly = Math.round(yearThreeRate * yearThreeChannels);
            var yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            var yearTwoAnnual = Math.round(yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport);
            var yearThreeAnnual = Math.round(yearThreeMonthly * 12 + yearThreeSetupFee + yearThreeSupport);
            break;
        case 2:
            var yearOneChannels = parseInt(quote.year_one_channels);
            var yearTwoChannels = parseInt(quote.year_two_channels);
            var yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            var yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            var yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            var yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            yearOneRate += yearOneRate * protocolCharge/100;
            yearTwoRate += yearTwoRate * protocolCharge/100;
            var newChannels2 = yearTwoChannels - yearOneChannels;
            var newChannels1 = yearOneChannels;
            var yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            var yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            var yearThreeSupport = 0;
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearTwoRate = yearTwoRate + yearTwoSupport;
            var yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            var yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            var yearThreeSetupFee = 0;
            var yearOneMonthly = Math.round(yearOneRate * yearOneChannels);
            var yearTwoMonthly = Math.round(yearTwoRate * yearTwoChannels);
            var yearThreeMonthly = 0;
            var yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            var yearTwoAnnual = Math.round(yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport);
            var yearThreeAnnual = 0;

            break;
        case 1:
            var yearOneChannels = parseInt(quote.year_one_channels);
            var yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            var yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearOneRate += yearOneRate * protocolCharge/100;
            var newChannels1 = yearOneChannels;
            var yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            var yearTwoSupport = 0;
            var yearThreeSupport = 0;
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            var yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            var yearTwoSetupFee = 0;
            var yearThreeSetupFee = 0;
            var yearOneMonthly = Math.round(yearOneRate * yearOneChannels);
            var yearTwoMonthly = 0;
            var yearThreeMonthly = 0;
            var yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            var yearTwoAnnual = 0;
            var yearThreeAnnual = 0;
            break;
    }

    var results = {
    year_one_monthly_streaming: yearOneMonthly,
    year_two_monthly_streaming: yearTwoMonthly,
    year_three_monthly_streaming: yearThreeMonthly,
    year_one_setup_fee: yearOneSetupFee,
    year_two_setup_fee: yearTwoSetupFee,
    year_three_setup_fee: yearThreeSetupFee,
    year_one_support_fee: yearOneSupport * yearOneChannels,
    year_two_support_fee: yearTwoSupport * yearTwoChannels,
    year_three_support_fee: yearThreeSupport * yearThreeChannels,
    year_one_annual_fee: yearOneAnnual, 
    year_two_annual_fee: yearTwoAnnual,
    year_three_annual_fee: yearThreeAnnual
    };

    return results;
};

Pricing.getRateRange = function(channelCount, streamingRates) {
    for (var i = 0; i < streamingRates.length; i++) {
        if (channelCount >= streamingRates[i].min_channels && channelCount <= streamingRates[i].max_channels) {
            range = streamingRates[i];
            return range;
        }
    }
};

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
};

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
};

Pricing.getSetupFee = function(channels, rate){
    var setupFee = channels * rate / 2;
    if (setupFee > 0) {
        return setupFee;
    }
    else {
        return 0;
    }
};

module.exports = Pricing;