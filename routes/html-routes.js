var Quotes = require('../controllers/quotes_controller.js')

 module.exports = function(app) {
     app.get("/", function(req, res) {
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
                     test: { label: "this is test" }

                 };
                 console.log(resquote.test.label);
                 res.render("result", { resquote });

             }
         })
     });
     app.get("/quote", function(req, res) {
         res.render("quote", {});
     });
}

//module.exports = function(app){
   // app.get("/", function(req, res) {
     //   res.render("allQuotes", {});
   // });
   //app.get("/result", function(req, res) {
        // res.render("result", {});
   //  });
   // app.get("/quote", function(req, res) {
      //   res.render("quote", {});
   //  });
//}

>>>>>>> 2ea5e0f8046002c5f11f1cdfece111802049abc3
