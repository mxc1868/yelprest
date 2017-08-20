var express = require("express");
var router = express.Router();
var passport = require("passport");
var UserSchema = require("../models/users");

router.get("/", function(req, res) {
   res.send("<h1>Hi</h1>");
});
router.get("/login", function(req, res) {
   res.render("mainpages/login"); 
});
router.post("/login", passport.authenticate("local", {
        successRedirect: "/restaurants",
        failurRedirect: "/login"
    }), function(req, res) {
    
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
module.exports = router;