var Quotes = require('../controllers/quotes_controller.js');
//added express router 
var express=require('express');
var router=express.Router();


 module.exports = function(app) {
     app.get("/home", function(req, res) {
         Quotes.getAll(function callback(allQuotes) {
             console.log(allQuotes)
             var result = {
                 quotes: allQuotes
             };


             res.render("allQuotes", result);
         })
     });

     app.get("/result/:id", function(req, res) {
         console.log(req.params.id);
         Quotes.getOne(req.params.id, function callback(quote) {
             if (quote.length === 0) {
                 res.status(404).send({
                     result: "error",
                     message: "Quote not found"
                 })
             } else {
                 var resquote = {
                     quote: quote,
                 };
                 res.render("result", resquote);

             }
         })
     });
     app.get("/quote", function(req, res) {
         res.render("quote", {});
     });
     //changed from app to router
     router.post("/", function(req, res) {
        req = Quotes.validate(req)
        Quotes.save(req.body, function callback(result){
            res.redirect("/result/" + result.quote.id + "?_method=GET");
        })
     });
    
}



