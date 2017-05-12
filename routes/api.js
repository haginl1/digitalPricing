var express    = require('express'); 
var quotes     = require('pricing_controller.js')

var apiRouter  = express.Router(); 

var db = require("../models");

apiRouter.get("/allquotes", function(req, res) {
    db.Quote.findAll({})
    .then(function(dbAllQuotes) {
        res.send(dbAllQuotes)
    })
    .catch(function (err) {
        console.log(err);
    });;
});

apiRouter.post("/workout", function(req, res) {
    console.log(req.body)
    db.Workout.create(req.body)
        .then(function(dbPost) {
            res.send({
                result: "success"
            })
        })
        .catch(function (err) {
            res.send({
                result: "error",
                message: err.errors[0].message
            });
        });
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