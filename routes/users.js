var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var session=require("express-session");

// var SalesforceStrategy = require('passport-salesforce').Strategy;

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
        console.log(errors);
        res.render('register', {
            errors: errors
        });
        // res.render('register', {
        //res.send({result: 'error', details: errors});
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
            if (err) {
                res.send(err);
            } 
            else {
                res.send(user);
            }
        });
        // res.redirect('/');
    }
});

//consumer key: 3MVG9zlTNB8o8BA2hxqp9WSjv2eDMS._YkqOooyC8QplgMItVALnUmhjIpq.nbRSQ_M8qYeeMhvM_ZXzXzq3.
//consumer secret: 3579424323187320615

// var CLIENT_SECRET = "3579424323187320615";
// var CLIENT_ID = "3MVG9zlTNB8o8BA2hxqp9WSjv2eDMS._YkqOooyC8QplgMItVALnUmhjIpq.nbRSQ_M8qYeeMhvM_ZXzXzq3.";

// passport.use(new SalesforceStrategy({
//  clientID: CLIENT_ID,
//  clientSecret: CLIENT_SECRET,
//  callbackURL: "http://localhost:8080/salesforce/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//  done(null, {});
//   }
// ));

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
                 console.log('Compare Password '+user.id);
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
        failureRedirect: '/login',
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
   // res.redirect('/');
    
});


module.exports = router;