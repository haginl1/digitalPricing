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
                 res.render("result", resquote);

             }
         })
     });
     app.get("/quote", function(req, res) {
         res.render("quote", {});
     });
     app.post("/", function(req, res) {
        if (req.body.year_one_channels.length === 0) {
            req.body.year_one_channels = 0
        }
        if (req.body.year_two_channels.length === 0) {
            req.body.year_two_channels = 0
        }
        if (req.body.year_three_channels.length === 0) {
            req.body.year_three_channels = 0
        }
        if (typeof(req.body.HLS) === "undefined") {
            req.body.HLS = 0
        }
        if (typeof(req.body.HDS) === "undefined") {
            req.body.HDS = 0
        }
        if (typeof(req.body.RTMP) === "undefined") {
            req.body.RTMP = 0
        }
        if (typeof(req.body.MPEG_DASH) === "undefined") {
            req.body.MPEG_DASH = 0
        }
        Quotes.save(req.body, function callback(result){
            res.redirect("/result/" + result.quote.id + "?_method=GET");
        })
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


