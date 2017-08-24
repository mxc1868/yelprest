var express = require("express");
var router = express.Router();
var passport = require("passport");
var UserSchema = require("../models/users");

router.get("/", function(req, res) {
   res.render("mainpages/mainpage");
});
router.get("/login", function(req, res) {
   res.render("mainpages/login"); 
});
router.post("/login", passport.authenticate("local", {
        failWithError: true
    }), function(req, res, next) {
        req.flash("success", "Welcome to YelpRestaurant " + req.user.username);
        res.redirect("/restaurants");
    }, function(err, req, res, next) {
    // handle error
        console.log(err);
        req.flash("error", "Fail to Login. Please Try Again");
        res.redirect('/login');
  });
router.get("/signup", function(req, res) {
   res.render("mainpages/signup"); 
});
router.post("/signup", function(req, res) {
    var newUser = new UserSchema({username: req.body.username});
    UserSchema.register(newUser, req.body.password, function(err, user) {
       if (err) {
           req.flash("error", err.message);
           res.redirect("/signup");
       } else {
           passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpRestaurant " + user.username);
           res.redirect("/restaurants"); 
        });
       }
    });
});
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/restaurants");
});
module.exports = router;