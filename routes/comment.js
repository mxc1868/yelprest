var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware/middleware");
var RestaurantSchema = require("../models/restaurants");
var CommentSchema = require("../models/comments");

router.get("/new", middleware.isLoggedIn, function(req, res) {
   RestaurantSchema.findById(req.params.id, function(err, result) {
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {restaurant: result});   
      }
   });
});
router.post("/", middleware.isLoggedIn, function(req, res) {
   RestaurantSchema.findById(req.params.id, function(err, restaurant) {
      if (err) {
         console.log(err);
      } else {
         CommentSchema.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               restaurant.comments.push(comment);
               restaurant.save();
               console.log(comment);
               req.flash("success", "Successfully added comment");
               res.redirect('/restaurants/' + restaurant._id);
           }
        });
      }
   });
})
router.get("/:commentId/update", function(req, res) {
   CommentSchema.findById(req.params.commentId, function(err, result) {
       if (err) {
          console.log(err);
       } else {
          res.render("comments/update", {restaurantId: req.params.id, comment: result});
       }
   })
});
router.put("/:commentId", function(req, res) {
   CommentSchema.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, result) {
       if (err) {
          console.log(err);
       } else {
          res.redirect("/restaurants/"+req.params.id);
       }
   })
})
router.delete("/:commentId", function(req, res) {
   CommentSchema.findByIdAndRemove(req.params.commentId, function(err, result) {
       if (err) {
          console.log(err);
          res.redirect("back");
       } else {
          RestaurantSchema.findById(req.params.id, function(err, resultRestaurant) {
             if (err) {
                console.log(err);
             } else {
               console.log("Before"+resultRestaurant);
               var index = resultRestaurant.comments.indexOf(req.params.commentId);
               resultRestaurant.comments.splice(index, 1);
               resultRestaurant.save();
               console.log("After"+resultRestaurant);
            }
          });
          req.flash("success", "Comment deleted");
          res.redirect("/restaurants/"+req.params.id);
       }
   })
})

module.exports = router;