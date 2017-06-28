var express=require('express');
var router=express.Router();

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
}else{
	//req.flash('error_msg', 'You are not logged in');
	res.redirect('/users/login');
	}
}

//Get homepage
router.get('/', ensureAuthenticated, function(req,res){
	res.render('allQuotes');
});



module.exports=router;
