var express    = require('express'); 
var Quotes     = require('../controllers/quotes_controller.js')

var apiRouter  = express.Router(); 

apiRouter.get("/allquotes", function(req, res) {
    Quotes.getAll(function callback(result) {
        res.send(result);
    })
});

// apiRouter.post("/workout", function(req, res) {
//     console.log(req.body)
//     db.Workout.create(req.body)
//         .then(function(dbPost) {
//             res.send({
//                 result: "success"
//             })
//         })
//         .catch(function (err) {
//             res.send({
//                 result: "error",
//                 message: err.errors[0].message
//             });
//         });
// });


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