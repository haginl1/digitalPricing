var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var session=require("express-session");

router.post('/register', function(req, res) {
     console.log("IN POST");
    var name = req.body.name;
     var email = req.body.email;
     var username = req.body.username;
     var password = req.body.password;
    var password2 = req.body.password2;
    //Validation
     req.checkBody('name', 'Name is require').notEmpty();
    req.checkBody('email', 'Email is require').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is require').notEmpty();
    req.checkBody('password', 'Password2 is require').notEmpty();
    req.checkBody('password2', 'Passwords do no match').equals(req.body.password);

    var errors = req.validationErrors();
    var result = {};
    if (errors) {
        console.log('error');
       // res.redirect('/');
        // res.render('register', {
        //      errors: errors
        //  });
    } else {
        console.log('user good!');
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log("newuser "+user);
            result=user._id;
            console.log('result id'+result);
        });
        req.flash('success_msg', 'You are registered and can now log in');
        // res.redirect('/users/login');
        res.send(result);
    }
});
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log("matched"+ isMatch+" "+(user!=null));
                    console.log(user.id);
                  
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect Password'
                    });
                }
            });
        });
    }));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        // successRedirect: '/pages/QuoteHistory',
        //failureRedirect: '/users/login',
        failureRedirect: '/users/login',
        failureFlash: true
   }),
    function(req, res) {
         return res.send(user._id);
        res.redirect('/');
    });
// router.post('/login', function(req, res, next) {

//   // generate the authenticate method and pass the req/res
//   passport.authenticate('local', function(err, user, info) {

//     if (err) { return next(err); }
//     //if (!user) { return res.redirect('/'); }
// if (!user) { return next(err); }
//     // req / res held in closure
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }

//       return res.send(user._id);
//        successRedirect: '/'
//     });

//   })(req, res, next);

// });


router.get('/logout', function(req,res){
    console.log("you are logged out");
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
    
});


module.exports = router;