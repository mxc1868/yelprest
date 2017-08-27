var RestaurantSchema = require("../models/restaurants");
var CommentSchema = require("../models/comments");
var middleware={};
middleware.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error","You need to be logged in to continue");
        res.redirect("/login");
    }
};

middleware.checkRestaurantOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        RestaurantSchema.findById(req.params.id, function(err, foundRestaurant){
           if(err){
               req.flash("error", "Restaurant not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundRestaurant.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        CommentSchema.findById(req.params.commentId, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
module.exports = middleware;