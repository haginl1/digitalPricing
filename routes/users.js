var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var session=require("express-session");
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});

router.post('/login', passport.authenticate('local'), function(req,res){
    res.send(req.user._id);
});

router.post('/register', function(req, res) {
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
         res.send({result: 'error', details: errors});
    } else {
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

passport.use(new LocalStrategy(
    {usernameField:"username", passwordField:"password"},
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect Password'
                    });
                }
            });
        });
    }));

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});



module.exports = router;