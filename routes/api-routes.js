var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')

var apiRouter  = express.Router(); 

apiRouter.get("/allquotes", function(req, res) {
    Quotes.getAll(function callback(allQuotes) {
        res.send(allQuotes);
    })
});

apiRouter.post("/saveQuoteSelections", function(req, res) {
    Quotes.saveQuoteSelections(req.body, function callback(result){
        res.send(result)
    })
});


// apiRouter.put("/:id", function(req, res) {
//     db.workout.update({
//             devoured: true
//         },
//         {
//             where: 
//             {
//             id: req.body.id
//             }
//     }).then(function(dbPost) {
//             res.redirect("/");
//         })
// });




// Export routes for server.js to use.
module.exports = apiRouter;