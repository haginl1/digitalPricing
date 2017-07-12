"use strict";
var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')
var apiRouter  = express.Router(); 

apiRouter.get("/quotes/:userID", function(req, res) {
    Quotes.getAll(req.params.userID, function callback(allQuotes) {
        res.send(allQuotes);
    })
});

apiRouter.get("/estimate/:contractTerm/:yearOneChannels/:yearTwoChannels/:yearThreeChannels/:HLS/:HDS/:MPEG_DASH/:RTMP/:supportPlan", function(req, res) {
    var req = {
        contract_term: req.params.contractTerm,
        year_one_channels: req.params.yearOneChannels,
        year_two_channels: req.params.yearTwoChannels,
        year_three_channels: req.params.yearThreeChannels,
        HLS: req.params.HLS,
        HDS: req.params.HDS,
        MPEG_DASH: req.params.MPEG_DASH,
        RTMP: req.params.RTMP,
        support_plan: req.params.supportPlan
    }
    Quotes.getEstimate(req, function callback(estimate) {
        res.send(estimate);
    })
});

apiRouter.get("/quote/:id", function(req, res) {
    Quotes.getOne(req.params.id, function callback(quote) {
        if (quote.length === 0) {
            res.status(404).send({
                result: "error",
                message: "Quote not found"                
            })
        }   
        else {
            res.send(quote);
        }
    })
});

apiRouter.post("/quote/:userID", function(req, res) {
    Quotes.save(req.body, req.params.userID, function callback(result){
        res.send(result)
    })
});

module.exports = apiRouter;
