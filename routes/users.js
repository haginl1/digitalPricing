var express=require('express');
var router=express.Router();

//Register
router.get('/register',function(req,res){
	res.render('register');
});
//Login
router.get('/login',function(req,res){
	res.render('login');
});

//register user
//Register
router.post('/register',function(req,res){
	var name =req.body.name;
	var email = req.body.email;
	var username =req.body.username;
	var password =req.body.password;
	var password2 =req.body.password2;
	//Validation
	req.checkBody('name', 'Name is require').notEmpty();
	req.checkBody('email', 'Email is require').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is require').notEmpty();
	req.checkBody('password', 'Password2 is require').notEmpty();
	req.checkBody('password2', 'Passwords do no match').equals(req.body.password);
	
	var errors=req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});

	}else {
		var newUser = new
	}

});

module.exports=router;