module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("allQuotes", {});
    });
    app.get("/result", function(req, res) {
         res.render("result", {});
     });
     app.get("/quote", function(req, res) {
         res.render("quote", {});
     });
}

