var Pricing = {};

Pricing.calculate = function(quote, protocolRates, streamingRates, supportRates) {

    var protocols = 0;
    var yearOneChannels = 0;
    var yearTwoChannels = 0;
    var yearThreeChannels = 0;
    var yearOneRange = {};
    var yearTwoRange = {};
    var yearThreeRange = {};
    var yearOneRate = 0;
    var yearTwoRate = 0;
    var yearThreeRate = 0;
    var newChannels1 = 0;
    var newChannels2 = 0;
    var newChannels3 = 0;
    var yearOneSupport = 0;
    var yearTwoSupport = 0;
    var yearThreeSupport = 0;
    var yearOneSetupFee = 0;
    var yearTwoSetupFee = 0;
    var yearThreeSetupFee = 0;
    var yearOneMonthly = 0;
    var yearTwoMonthy = 0;
    var yearThreeMonthly = 0;
    var yearOneAnnual = 0;
    var yearTwoAnnual = 0;
    var yearThreeAnnual = 0;

    var contractTerm = parseInt(quote.contract_term);
    var protocolCharge = protocolRates[0].additional_protocol_rate_percent;

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
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = parseInt(quote.year_three_channels);
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            yearThreeRange = Pricing.getRateRange(yearThreeChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            yearThreeRate = Pricing.getStreamingRate(contractTerm, yearThreeRange);
            yearOneRate += yearOneRate * protocolCharge/100;
            yearTwoRate += yearTwoRate * protocolCharge/100;
            yearThreeRate += yearThreeRate * protocolCharge/100;
            newChannels3 = yearThreeChannels - yearTwoChannels;
            newChannels2 = yearTwoChannels - yearOneChannels;
            newChannels1 = yearOneChannels;
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
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = parseInt(quote.year_two_channels);
            yearThreeChannels = 0;
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearTwoRange = Pricing.getRateRange(yearTwoChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearTwoRate = Pricing.getStreamingRate(contractTerm, yearTwoRange);
            yearThreeRate = 0;
            yearOneRate += yearOneRate * protocolCharge/100;
            yearTwoRate += yearTwoRate * protocolCharge/100;
            newChannels2 = yearTwoChannels - yearOneChannels;
            newChannels1 = yearOneChannels;
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearThreeSupport = 0;
            yearTwoSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = Math.round(yearTwoRate * yearTwoSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearTwoRate = yearTwoRate + yearTwoSupport;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = Math.round(Pricing.getSetupFee(newChannels2, yearTwoRate));
            yearThreeSetupFee = 0;
            yearOneMonthly = Math.round(yearOneRate * yearOneChannels);
            yearTwoMonthly = Math.round(yearTwoRate * yearTwoChannels);
            yearThreeMonthly = 0;
            yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            yearTwoAnnual = Math.round(yearTwoMonthly * 12 + yearTwoSetupFee + yearTwoSupport);
            yearThreeAnnual = 0;

            break;
        case 1:
            yearOneChannels = parseInt(quote.year_one_channels);
            yearTwoChannels = 0;
            yearThreeChannels = 0;
            yearOneRange = Pricing.getRateRange(yearOneChannels, streamingRates);
            yearOneRate = Pricing.getStreamingRate(contractTerm, yearOneRange);
            yearOneRate += yearOneRate * protocolCharge/100;
            yearTwoRate = 0;
            yearThreeRate = 0;
            newChannels1 = yearOneChannels;
            yearOneSupport = Pricing.getSupportFee(quote, supportRates);
            yearTwoSupport = 0;
            yearThreeSupport = 0;
            yearOneSupport = Math.round(yearOneRate * yearOneSupport);
            yearOneRate = yearOneRate + yearOneSupport;
            yearOneSetupFee = Math.round(Pricing.getSetupFee(newChannels1, yearOneRate));
            yearTwoSetupFee = 0;
            yearThreeSetupFee = 0;
            yearOneMonthly = Math.round(yearOneRate * yearOneChannels);
            yearTwoMonthly = 0;
            yearThreeMonthly = 0;
            yearOneAnnual = Math.round(yearOneMonthly * 12 + yearOneSetupFee + yearOneSupport);
            yearTwoAnnual = 0;
            yearThreeAnnual = 0;
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